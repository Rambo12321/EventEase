import app from "../app.js";
import { getAuthToken, getAuthToken2 } from "../src/utils/testUtil.js";
import prisma from "../src/utils/prismaClient.js";
import request from "supertest";

let token1, id1, token2, id2, eventId;

beforeAll(async () => {
  const body1 = await getAuthToken();
  const body2 = await getAuthToken2();

  token1 = body1.token;
  id1 = body1.user.id;

  token2 = body2.token;
  id2 = body2.user.id;
});

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { id: { in: [parseInt(id1), parseInt(id2)] } },
  });
  await prisma.$disconnect();
});

describe("Event API test cases", () => {
  it("Should get all the events (empty array initially)", async () => {
    const res = await request(app).get("/event");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Should not post an event without token", async () => {
    const res = await request(app).post("/event").send({
      title: "Unauthorized Event",
      date: "2025-12-01T10:00:00Z",
      location: "Delhi",
    });

    expect(res.statusCode).toBe(401);
  });

  it("Should post an event with token1", async () => {
    const res = await request(app)
      .post("/event")
      .set("Authorization", `Bearer ${token1}`)
      .send({
        title: "Test Event",
        date: "2025-12-01T10:00:00Z",
        location: "Delhi",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title", "Test Event");
    expect(res.body).toHaveProperty("location", "Delhi");

    eventId = res.body.id;
  });

  it("Should get event by ID", async () => {
    const res = await request(app).get(`/event/${eventId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", eventId);
    expect(res.body).toHaveProperty("title", "Test Event");
  });

  it("Should return 404 when event not found", async () => {
    const res = await request(app).get("/event/999999");
    expect(res.statusCode).toBe(404);
  });

  it("Should return 500/400 for non-numeric ID", async () => {
    const res = await request(app).get("/event/abc");
    expect([400, 500]).toContain(res.statusCode);
  });

  it("Should update event fully with owner (token1)", async () => {
    const res = await request(app)
      .put(`/event/${eventId}`)
      .set("Authorization", `Bearer ${token1}`)
      .send({
        title: "Updated Event",
        date: "2025-12-02T12:00:00Z",
        location: "Mumbai",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title", "Updated Event");
  });

  it("Should not allow full update by non-owner (token2)", async () => {
    const res = await request(app)
      .put(`/event/${eventId}`)
      .set("Authorization", `Bearer ${token2}`)
      .send({
        title: "Hacker Update",
        date: "2025-12-03T15:00:00Z",
        location: "Chennai",
      });

    expect([401, 403]).toContain(res.statusCode);
  });

  it("Should update event partially with owner (token1)", async () => {
    const res = await request(app)
      .patch(`/event/${eventId}`)
      .set("Authorization", `Bearer ${token1}`)
      .send({
        location: "Bangalore",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("location", "Bangalore");
  });

  it("Should not patch with empty body", async () => {
    const res = await request(app)
      .patch(`/event/${eventId}`)
      .set("Authorization", `Bearer ${token1}`)
      .send({});

    expect(res.statusCode).toBe(401);
  });

  it("Should not allow patch by non-owner (token2)", async () => {
    const res = await request(app)
      .patch(`/event/${eventId}`)
      .set("Authorization", `Bearer ${token2}`)
      .send({
        title: "Malicious Change",
      });

    expect([401, 403]).toContain(res.statusCode);
  });

  it("Should delete event with owner (token1)", async () => {
    const res = await request(app)
      .delete(`/event/${eventId}`)
      .set("Authorization", `Bearer ${token1}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

  it("Should not delete already deleted event", async () => {
    const res = await request(app)
      .delete(`/event/${eventId}`)
      .set("Authorization", `Bearer ${token1}`);

    expect([404, 500]).toContain(res.statusCode);
  });

  it("Should not allow delete by non-owner (token2)", async () => {
    // create another event with token1
    const res1 = await request(app)
      .post("/event")
      .set("Authorization", `Bearer ${token1}`)
      .send({
        title: "To be attacked",
        date: "2025-12-05T10:00:00Z",
        location: "Delhi",
      });

    const newEventId = res1.body.id;

    const res2 = await request(app)
      .delete(`/event/${newEventId}`)
      .set("Authorization", `Bearer ${token2}`);

    expect([401, 403]).toContain(res2.statusCode);
  });
});
