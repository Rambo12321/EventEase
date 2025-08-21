import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient.js";

export const requireAuth = (req, res, next) => {
  try {
    const header = req.headers["authorization"] || "";
    const [type, token] = header.split(" ");

    console.log("Auth Header:", req.headers.authorization);

    if (type !== "Bearer" || !token) {
      const err = new Error(`Missing or Invalid authentication Token`);
      err.statusCode = 401;
      throw err;
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (error) {
    next(error);
  }
};

export const verifyUser = async (id, userId, role) => {
  const foundEvent = await prisma.event.findUnique({
    where: { id: parseInt(id) },
  });

  if (!foundEvent) {
    const err = new Error(`No event found with ${id}`);
    err.statusCode = 404;
    throw err;
  }

  if (foundEvent.userId === userId || role === "ADMIN") {
    return true;
  }
  const err = new Error(`Unautharized Access`);
  err.statusCode = 403;
  throw err;
};
