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

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management APIs
 */

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []   # requires JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized (missing/invalid token)
 */

router
  .route("/")
  .get(getAllEvents)
  .post(requireAuth, validate(eventSchema), addEvent);

/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The Event ID
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 *   put:
 *     summary: Update event fully
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated
 *       403:
 *         description: Forbidden (not owner/admin)
 *   patch:
 *     summary: Update event partially
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventPartial'
 *     responses:
 *       200:
 *         description: Event updated
 *   delete:
 *     summary: Delete event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Event deleted
 *       403:
 *         description: Forbidden
 */

router
  .route("/:id")
  .get(getEventById)
  .put(requireAuth, validate(eventSchema), updateEventFull)
  .patch(requireAuth, validate(updateEventSchema), updateEventPartial)
  .delete(requireAuth, deleteEvent);

export default router;
