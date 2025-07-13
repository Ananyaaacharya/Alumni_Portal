//backend\routes\user.router.js
import express from "express";
import {
  addUser,
  getUsers,
  deleteUser,
  detailUser,
  updateUser,
  searchUsers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/add-user", addUser);
router.get("/", getUsers); 
router.delete("/delete-user", deleteUser);
router.get("/user-detail", detailUser);
router.put("/update-user", updateUser);
router.get("/search", searchUsers);

export default router;
