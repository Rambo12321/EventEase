import request from "supertest";
import app from "../../app.js";
import prisma from "./prismaClient.js";

export const getAuthToken = async () => {
  await prisma.user.deleteMany();

  await request(app).post("/auth/register").send({
    email: "Balboa@gmail.com",
    password: "1234567",
    name: "Balboa Rocky",
  });

  const res = await request(app).post("/auth/login").send({
    email: "Balboa@gmail.com",
    password: "1234567",
  });

  return res.body.token;
};
