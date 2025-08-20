import express from "express";
import {
  getAllEvents,
  getEventById,
  addEvent,
  updateEventFull,
  updateEventPartial,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.route("/").get(getAllEvents).post(addEvent);

router
  .route("/:id")
  .get(getEventById)
  .put(updateEventFull)
  .patch(updateEventPartial)
  .delete(deleteEvent);

export default router;
