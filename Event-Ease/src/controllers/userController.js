import prisma from "../utils/prismaClient.js";

export const getUsers = async (req, res, next) => {
  console.log("get all users");
  try {
    const users = await prisma.User.findMany();
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
    const user = await prisma.User.findUnique({
      where: { id: parseInt(id) },
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
    const { name, email } = req.body || {};
    if (!name || !email) {
      const err = new Error("Name and Email must be required to add User");
      err.statusCode = 401;
      throw err;
    }
    const newUser = await prisma.User.create({
      data: {
        name,
        email,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserPartial = async (req, res, next) => {
  try {
    const id = req.params.id || req.query.id || {};
    const { name, email } = req.body || {};
    if (!id) {
      const err = new Error("Id is required to update the user");
      err.statusCode = 401;
      throw err;
    }
    if (name === undefined && email === undefined) {
      const err = new Error(
        `At least one of the 2 fields "name" or "email" must be provided to update user partially`
      );
      err.statusCode = 401;
      throw err;
    }
    const updatedUser = await prisma.User.update({
      where: { id: parseInt(id) },
      data: {
        ...(name !== undefined && name !== "" && { name }),
        ...(email !== "" && email !== undefined && { email }),
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const updateUserFull = async (req, res, next) => {
  try {
    const id = req.params.id || req.query.id || {};
    const { name, email } = req.body || {};
    if (!id) {
      const err = new Error("Id is required to update the user");
      err.statusCode = 401;
      throw err;
    }
    if (!name || !email) {
      const err = new Error(
        `Both "name" or "email" must be provided to full update User`
      );
      err.statusCode = 401;
      throw err;
    }
    const updatedUser = await prisma.User.update({
      where: { id: parseInt(id) },
      data: {
        name,
        email,
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
    const deletedUser = await prisma.User.delete({
      where: { id: parseInt(id) },
    });
    console.log(`User Deleted -> id : ${deletedUser.id}`);
    res.status(202).json(deletedUser);
  } catch (error) {
    next(error);
  }
};
