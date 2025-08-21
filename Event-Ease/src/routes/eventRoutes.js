import express from "express";
import {
  getAllEvents,
  getEventById,
  addEvent,
  updateEventFull,
  updateEventPartial,
  deleteEvent,
} from "../controllers/eventController.js";
import { requireAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { eventSchema, updateEventSchema } from "../schemas/eventSchema.js";

const router = express.Router();

router
  .route("/")
  .get(getAllEvents)
  .post(requireAuth, validate(eventSchema), addEvent);

router
  .route("/:id")
  .get(getEventById)
  .put(requireAuth, validate(eventSchema), updateEventFull)
  .patch(requireAuth, validate(updateEventSchema), updateEventPartial)
  .delete(requireAuth, deleteEvent);

export default router;
