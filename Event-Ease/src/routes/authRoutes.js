import express from "express";
import { login, register } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API's
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *      summary: Register an User
 *      tags: [Auth]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Register'
 *      responses:
 *          201:
 *              description: Successfully Registered
 *          409:
 *              description: Email Already exists with another user
 *          500:
 *              description: Internal Server Error
 */
router.post("/register", validate(registerSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *      summary: Register an User
 *      tags: [Auth]
 *      security:
 *          - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Login'
 *      responses:
 *          200:
 *              description: Successfully Logged in
 *          404:
 *              description: No user found with provided Email
 *          403:
 *              description: Invalid Credentials
 *          500:
 *              description: Internal Server Error
 */
router.post("/login", validate(loginSchema), login);

export default router;
