import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app.js";
import prisma from "../src/utils/prismaClient.js";
import { randomUUID } from "crypto";

describe("Auth API", () => {
  let testEmail = `testuser_${randomUUID().slice(0, 8)}@mail.com`;
  let testPassword = "Password123!";
  let token, usrId;

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: { contains: "testuser_" } },
    });
    await prisma.event.deleteMany({
      where: { title: { contains: "React Conf" } },
    });
    await prisma.$disconnect();
  });

  // ---------------------- REGISTER ----------------------
  describe("POST /auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Test User",
        email: testEmail,
        password: testPassword,
        role: "USER",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe(testEmail);

      usrId = res.body.user.id;
      token = res.body.token; // save for later
    });

    it("should not allow duplicate email registration", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Test User",
        email: testEmail,
        password: testPassword,
      });

      expect(res.statusCode).toBe(409);
      expect(res.body.error).toBe("User with this Email already exists");
    });

    it("should fail validation for missing fields", async () => {
      const res = await request(app).post("/auth/register").send({
        email: "invalid@mail.com",
      });

      expect([400, 500]).toContain(res.statusCode);
    });
  });

  // ---------------------- LOGIN ----------------------
  describe("POST /auth/login", () => {
    it("should login an existing user", async () => {
      const res = await request(app).post("/auth/login").send({
        email: testEmail,
        password: testPassword,
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body.user.email).toBe(testEmail);
      token = res.body.token;
    });

    it("should fail with wrong password", async () => {
      const res = await request(app).post("/auth/login").send({
        email: testEmail,
        password: "wrongpassword",
      });

      expect(res.statusCode).toBe(403);
    });

    it("should fail with non-existent email", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "noone@mail.com",
        password: "Password123!",
      });

      expect(res.statusCode).toBe(404);
    });

    it("should fail validation with missing fields", async () => {
      const res = await request(app).post("/auth/login").send({
        email: testEmail,
      });

      expect([400, 500]).toContain(res.statusCode);
    });
  });

  // ---------------------- REQUIRE AUTH MIDDLEWARE ----------------------
  describe("Middleware: requireAuth", () => {
    //const protectedRoute = "/event"; // pick a route that requires auth
    let protectedRoute, newEvent, createdEveid;

    beforeAll(async () => {
      newEvent = await request(app)
        .post("/event")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "React Conf",
          description: "Talks & workshops",
          date: "2025-10-01T09:00:00.000Z",
          location: "Bangalore",
        });

      createdEveid = newEvent.body.id;
      protectedRoute = `/event/${createdEveid}`;
    });

    it("should allow access to edit with valid token", async () => {
      const res = await request(app)
        .patch(protectedRoute)
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Modified title",
        });

      expect(res.statusCode).not.toBe(401);
      expect(res.body.title).toBe("Modified title");
    });

    it("should reject request without Authorization header", async () => {
      const res = await request(app).patch(protectedRoute).send({
        title: "Not this one",
      });

      expect(res.statusCode).toBe(401);
    });

    it("should reject request with malformed header", async () => {
      const res = await request(app)
        .patch(protectedRoute)
        .set("Authorization", "Token someRandomToken")
        .send({
          title: "Not this one",
        });

      expect(res.statusCode).toBe(401);
    });

    it("should reject expired token", async () => {
      const expiredToken = jwt.sign(
        { sub: usrId, role: "USER" },
        process.env.JWT_SECRET,
        { expiresIn: "1ms" }
      );

      const res = await request(app)
        .patch(protectedRoute)
        .set("Authorization", `Bearer ${expiredToken}`)
        .send({
          title: "Not this one",
        });

      expect(res.statusCode).toBe(401);
    });

    it("should reject invalid token", async () => {
      const res = await request(app)
        .patch(protectedRoute)
        .set("Authorization", "Bearer invalid.token.string")
        .send({
          title: "Not this one",
        });

      expect(res.statusCode).toBe(401);
    });
  });
});
