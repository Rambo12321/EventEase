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

const router = express.Router();

router.route("/").get(getAllEvents).post(requireAuth, addEvent);

router
  .route("/:id")
  .get(getEventById)
  .put(requireAuth, updateEventFull)
  .patch(requireAuth, updateEventPartial)
  .delete(requireAuth, deleteEvent);

export default router;
