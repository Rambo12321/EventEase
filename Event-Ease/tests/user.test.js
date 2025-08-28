import app from "../app.js";
import request from "supertest";
import prisma from "../src/utils/prismaClient.js";

afterAll(async () => {
  await prisma.$disconnect();
});

describe("User API", () => {
  let newUserId, newUserId2;

  it("Should add an user", async () => {
    const res = await request(app).post("/user").send({
      name: "Dino-G1",
      email: "Dino@mail.com",
      password: "123456",
      role: "ORGANIZER",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty("id");

    newUserId = res.body.user.id;
  });

  it("Should not add an user as email is missing in fields", async () => {
    const res = await request(app).post("/user").send({
      name: "TestUser",
      email: "testuser@mail.com",
    });

    expect(res.statusCode).toBe(500);
  });

  it("Should not return password in response", async () => {
    const res = await request(app).post("/user").send({
      name: "NoPass",
      email: "nopass@mail.com",
      password: "123456",
      role: "USER",
    });
    expect(res.statusCode).toBe(201);
    console.log("body of res -> ", res.body);
    expect(res.body.user).not.toHaveProperty("password");
    newUserId2 = res.body.user.id;
  });

  it("Should return all users", async () => {
    const res = await request(app).get("/user");

    expect(res.statusCode).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("email");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("role");
    }
  });

  it("Should return Users with their events", async () => {
    const res = await request(app).get("/user/events");

    expect(res.statusCode).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("email");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("role");
      expect(res.body[0]).toHaveProperty("events");
      expect(Array.isArray(res.body[0].events)).toBe(true);
    }
  });

  it("Should fetch User with specific ID", async () => {
    const res = await request(app).get(`/user/${newUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("role");
  });

  it("Should not fetch a user with id as no user present with this id", async () => {
    const res = await request(app).get(`/user/10000`);

    expect(res.statusCode).toBe(404);
  });

  it("Should Patch (Partial update) the user", async () => {
    const res = await request(app).patch(`/user/${newUserId}`).send({
      name: "Dummy user",
      role: "ADMIN",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.user).toHaveProperty("id");
    expect(res.body.user).toHaveProperty("name");
    expect(res.body.user.role).toBe("ADMIN");
  });

  it("Should not Patch (Partial update) the user", async () => {
    const res = await request(app).patch(`/user/${newUserId}`).send({});
    expect(res.statusCode).toBe(401);
  });

  it("Should not Patch (Partial update) the user, Incorrect Role", async () => {
    const res = await request(app).patch(`/user/${newUserId}`).send({
      role: "NEW",
      name: "Rowdy",
    });
    expect(res.statusCode).toBe(500);
  });

  it("Should Update (full update) the user", async () => {
    const res = await request(app).put(`/user/${newUserId}`).send({
      name: "Dummy user",
      role: "USER",
      password: "1234565",
      email: "dumum@dum.com",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body.role).toBe("USER");
  });

  it("Should not Update (full update) the user", async () => {
    const res = await request(app).put(`/user/${newUserId}`).send({});
    expect(res.statusCode).toBe(500);
  });

  it("Should not Update (full update) the user, Incorrect Role", async () => {
    const res = await request(app).patch(`/user/${newUserId}`).send({
      name: "Dummy user",
      role: "NEW1",
      password: "1234565",
      email: "dumum@dum.com",
    });
    expect(res.statusCode).toBe(500);
  });

  it("Should not delete the user, as userID not present", async () => {
    const res = await request(app).delete("/user/100000");

    expect(res.statusCode).toBe(500);
  });

  it("Should delete both the users created in test, as userID present", async () => {
    const res = await request(app).delete(`/user/${newUserId}`);
    const res2 = await request(app).delete(`/user/${newUserId2}`);

    expect(res.statusCode).toBe(202);
    expect(res2.statusCode).toBe(202);
  });
});
