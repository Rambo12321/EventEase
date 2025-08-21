import express from "express";
import {
  getUsers,
  addUser,
  getUserByID,
  updateUserPartial,
  updateUserFull,
  deleteUser,
} from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { userSchema } from "../schemas/userSchema.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

router.route("/").get(getUsers).post(validate(userSchema), addUser);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The User ID
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 *   patch:
 *     summary: Update a user partially
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/UserPartial'
 *     responses:
 *       200:
 *         description: User updated
 *   put:
 *     summary: Update a user fully
 *     tags: [Users]
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
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       202:
 *         description: User deleted
 */

router
  .route("/:id")
  .get(getUserByID)
  .patch(validate(userSchema), updateUserPartial)
  .put(validate(userSchema), updateUserFull)
  .delete(deleteUser);

export default router;
