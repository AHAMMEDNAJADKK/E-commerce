import express from "express";
import {
  getUserProfile,
  getAllUsers,
  deleteUser,
  blockUser,
  makeAdmin
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

import {
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

// 🔐 Logged-in user profile
router.get("/profile", protect, getUserProfile);

// 🔐 Admin routes
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);
router.put("/:id/block", protect, adminOnly, blockUser);
router.put("/:id/admin", protect, adminOnly, makeAdmin);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
export default router;

