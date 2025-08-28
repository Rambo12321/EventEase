import prisma from "../utils/prismaClient.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  console.log("get all users");
  try {
    const users = await prisma.user.findMany({
      skip: 0,
      take: 20,
      orderBy: { id: "asc" },
      select: { id: true, name: true, email: true, role: true },
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserByID = async (req, res, next) => {
  console.log("get single user");
  try {
    const id = req.params.id || req.query.id || {};

    if (!id) {
      const err = new Error("Id is required to fetch the user");
      err.statusCode = 401;
      throw err;
    }
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, name: true, email: true, role: true },
    });
    if (!user) {
      const err = new Error(`No user found with Id : ${id}`);
      err.statusCode = 404;
      throw err;
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body || {};

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
        role,
      },
    });
    res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserPartial = async (req, res, next) => {
  try {
    let hashed;
    const id = req.params.id || req.query.id || {};
    const { name, email, password, role } = req.body || {};
    if (!id) {
      const err = new Error("Id is required to update the user");
      err.statusCode = 401;
      throw err;
    }
    if (
      name === undefined &&
      email === undefined &&
      password === undefined &&
      role === undefined
    ) {
      const err = new Error(
        `At least one of the 4 fields "name", "password", "role" or "email" must be provided to update user partially`
      );
      err.statusCode = 401;
      throw err;
    }
    if (password !== undefined && password !== "") {
      hashed = await bcrypt.hash(password, 10);
    }
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        ...(name !== undefined && name !== "" && { name }),
        ...(email !== "" && email !== undefined && { email }),
        ...(password !== "" && password !== undefined && { password: hashed }),
        ...(role !== "" && role !== undefined && { role }),
      },
    });
    res.status(200).json({
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserFull = async (req, res, next) => {
  try {
    const id = req.params.id || req.query.id || {};
    const { name, email, password, role } = req.body;
    if (!id) {
      const err = new Error("Id is required to update the user");
      err.statusCode = 401;
      throw err;
    }

    const hashed = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
        password: hashed,
        role,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id || req.query.id || {};
    if (!id) {
      const err = new Error("Id is required to delete the user");
      err.statusCode = 401;
      throw err;
    }
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    console.log(`User Deleted -> id : ${deletedUser.id}`);
    res.status(202).json(deletedUser);
  } catch (error) {
    next(error);
  }
};

export const getUsersWithEvents = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        events: {
          select: { id: true, title: true, date: true },
        },
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
