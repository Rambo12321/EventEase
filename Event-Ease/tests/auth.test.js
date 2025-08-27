import app from "../app.js";
import request from "supertest";
import prisma from "../src/utils/prismaClient.js";

beforeAll(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth API Routes", () => {
  it("Should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      name: "Rocky Balboa",
      email: "Balboa@gmail.com",
      password: "1234567",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user.id");
    expect(res.body.user.email).toBe("Balboa@gmail.com");
  });

  it("Should login the created user with correct password", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "Balboa@gmail.com",
      password: "1234567",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("Should reject login of created user with Wrong Creds", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "Balboa@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(403);
  });
});
