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

    console.log("Decoded payload:", payload);

    req.user = { id: payload.sub, role: payload.role };
    console.log("req.user set to:", req.user);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Token has expired, please login again";
    } else if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid authentication token";
    }
    next(error);
  }
};
