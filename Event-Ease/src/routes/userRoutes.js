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

router.route("/").get(getUsers).post(validate(userSchema), addUser);

router
  .route("/:id")
  .get(getUserByID)
  .patch(validate(userSchema), updateUserPartial)
  .put(validate(userSchema), updateUserFull)
  .delete(deleteUser);

export default router;
