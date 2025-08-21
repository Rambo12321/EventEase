import { verifyUser } from "../middleware/auth.js";
import prisma from "../utils/prismaClient.js";

export const getAllEvents = async (req, res, next) => {
  try {
    const events = await prisma.Event.findMany({
      include: { user: true },
    });
    res.status(200).json(events);
  } catch (error) {
    if (error.code === "P2002") {
      error.statusCode = 409;
      error.message = "Email already exists";
    }
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const id = req.params.id || req.query.id || {};

    if (!id) {
      const err = new Error("id is required to get event by Id");
      err.statusCode = 401;
      throw err;
    }

    const event = await prisma.Event.findUnique({
      where: { id: parseInt(id) },
      include: { user: true },
    });

    if (!event) {
      const err = new Error(`No event found by id : ${id}`);
      err.statusCode = 404;
      throw err;
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    next(error);
  }
};

export const addEvent = async (req, res, next) => {
  try {
    const { title, description, date, location } = req.body || {};

    // NO NEED TO CHECK THIS AS NOW WE ARE SENDING REQUEST FROM USER(LOGGED IN)
    // if (!userId) {
    //   const err = new Error(`"UserId" must be provided to create event`);
    //   err.statusCode = 401;
    //   throw err;
    // }

    // const user = await validateUser(userId);

    // if (!user) {
    //   const err = new Error(`No user exist with id : ${userId}`);
    //   err.statusCode = 404;
    //   throw err;
    // }

    if (!title || !date || !location) {
      const err = new Error(
        `"location" , "date" and "title" must be provided to create event`
      );
      err.statusCode = 401;
      throw err;
    }

    const event = await prisma.Event.create({
      data: {
        title,
        description,
        date,
        location,
        userId: req.user.id,
      },
      include: { user: true },
    });
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEventFull = async (req, res, next) => {
  try {
    const id = req.params.id || req.query.id || {};

    if (!id) {
      const err = new Error("id is required to Update Event Full");
      err.statusCode = 401;
      throw err;
    }

    const { title, description, date, location } = req.body || {};

    // if (!userId) {
    //   const err = new Error(`"UserId" must be provided to Update event Full`);
    //   err.statusCode = 401;
    //   throw err;
    // }

    // const user = await validateUser(userId);

    // if (!user) {
    //   const err = new Error(`No user exist with id : ${userId}`);
    //   err.statusCode = 404;
    //   throw err;
    // }

    if (!title || !date || !location) {
      const err = new Error(
        `"location" , "date" and "title" must be provided to Update Full event`
      );
      err.statusCode = 401;
      throw err;
    }

    await verifyUser(id, req.user.id, req.user.role);

    const updatedEvent = await prisma.Event.update({
      where: { id: parseInt(id) },
      data: {
        location,
        date,
        title,
        ...(description !== "" && { description }),
        userId: req.user.id,
      },
    });
    res.status(200).json(updatedEvent);
  } catch (error) {
    next(error);
  }
};

export const updateEventPartial = async (req, res, next) => {
  try {
    const id = req.params.id || req.query.id || {};

    if (!id) {
      const err = new Error("id is required to update event partial");
      err.statusCode = 401;
      throw err;
    }

    const { title, description, date, location } = req.body || {};

    // if (!userId) {
    //   const err = new Error(`"userId" not provided`);
    //   err.statusCode = 401;
    //   throw err;
    // }

    // const user = await validateUser(userId);

    // if (!user) {
    //   const err = new Error(`No user exist with id : ${userId}`);
    //   err.statusCode = 404;
    //   throw err;
    // }

    if (!title && !date && !location && !description) {
      const err = new Error(
        `"location" , "date", "title", "description must be provided to update event`
      );
      err.statusCode = 401;
      throw err;
    }

    await verifyUser(id, req.user.id, req.user.role);

    const updatedEvent = await prisma.Event.update({
      where: { id: parseInt(id) },
      data: {
        ...(title !== (undefined || "") && { title }),
        ...(description !== (undefined || "") && { description }),
        ...(location !== (undefined || "") && { location }),
        ...(date !== (undefined || "") && { date }),
        userId: req.user.id,
      },
    });

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(`Error in Update Event partial -> ${error}`);
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const id = req.params.id || req.query.id || {};

    if (!id) {
      const err = new Error("id is required to get event by Id");
      err.statusCode = 401;
      throw err;
    }

    await verifyUser(id, req.user.id, req.user.role);

    const deletedEvent = await prisma.Event.delete({
      where: { id: parseInt(id) },
    });

    res
      .status(200)
      .json({ message: `User deleted event id : ${deletedEvent.id}` });
  } catch (error) {
    next(error);
  }
};
