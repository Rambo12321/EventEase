import request from "supertest";
import app from "../../app.js";
import prisma from "./prismaClient.js";

export const getAuthToken = async () => {
  await request(app).post("/auth/register").send({
    email: "Balboa@gmail.com",
    password: "1234567",
    name: "Balboa Rocky",
    role: "ORGANIZER",
  });

  const res = await request(app).post("/auth/login").send({
    email: "Balboa@gmail.com",
    password: "1234567",
  });

  return res.body;
};

export const getAuthToken2 = async () => {
  await request(app).post("/auth/register").send({
    email: "Balboa1@gmail.com",
    password: "1234567",
    name: "Balboa1 Rocky1",
    role: "USER",
  });

  const res = await request(app).post("/auth/login").send({
    email: "Balboa1@gmail.com",
    password: "1234567",
  });

  return res.body;
};
