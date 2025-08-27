import app from "../app.js";
import { getAuthToken } from "../src/utils/testUtil.js"; // <-- added .js
import prisma from "../src/utils/prismaClient.js";
import request from "supertest";

let token;

beforeAll(async () => {
  await prisma.event.deleteMany();
  token = await getAuthToken();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Event API test cases", () => {
  it("Should get all the events", async () => {
    const res = await request(app).get("/event");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("title");
      expect(res.body[0]).toHaveProperty("date");
      expect(res.body[0]).toHaveProperty("location");
      expect(res.body[0]).toHaveProperty("userId");
    }
  });

  it("Should post an event", async () => {
    const res = await request(app)
      .post("/event")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Event",
        date: "2025-12-01T10:00:00Z",
        location: "Delhi",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("title");
    expect(res.body).toHaveProperty("location");
  });
});
