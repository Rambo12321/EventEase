import prisma from "../utils/prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signToken = (user) => {
  return jwt.sign(
    {
      sub: user.id, //payload
      role: user.role, //payload
    },
    process.env.JWT_SECRET, //Secret Key
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" } // Expire time
  );
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // NOT REQUIRED MANUALLY AS HANDLED by zod
    // if (!name || !email || !password) {
    //   const err = new Error(
    //     `"Name", "Email", and "Password" must be provided to register an User`
    //   );
    //   err.statusCode = 401;
    //   throw err;
    // }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role || "USER",
      },
    });

    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error.code === "P2002") {
      error.statusCode = 409;
      error.message = "User with this Email already exists";
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    // NOT REQUIRED MANUALLY AS HANDLED by zod
    // if (!email || !password) {
    //   const err = new Error(`Please provide the Email and Password to login`);
    //   err.statusCode = 401;
    //   throw err;
    // }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      const err = new Error(`No user found with Email : ${email}`);
      err.statusCode = 404;
      throw err;
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      const err = new Error(
        `Email and Password do not match. Enter Correct credentials`
      );
      err.statusCode = 404;
      throw err;
    }

    const token = signToken(user);

    res.status(200).json({
      token,
      user: {
        name: user.name,
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
