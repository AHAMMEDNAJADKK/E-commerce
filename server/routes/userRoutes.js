import express from "express";
import {
  getUserProfile,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Logged-in user profile
router.get("/profile", protect, getUserProfile);

// 🔐 Admin routes
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;

