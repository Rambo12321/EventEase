import express from "express";
import {
  getUsers,
  addUser,
  getUserByID,
  updateUserPartial,
  updateUserFull,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getUsers).post(addUser);

router
  .route("/:id")
  .get(getUserByID)
  .patch(updateUserPartial)
  .put(updateUserFull)
  .delete(deleteUser);

export default router;
