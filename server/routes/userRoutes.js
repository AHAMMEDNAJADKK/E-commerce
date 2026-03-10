import express from "express";

import {
  registerUser,
  getUserProfile,
  getAllUsers,
  deleteUser,
  blockUser,
  makeAdmin,
  forgotPassword,
  resetPassword
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ============================= */
/* 🔐 AUTH */
/* ============================= */

router.post("/register", registerUser);

/* ============================= */
/* 🔐 USER */
/* ============================= */

router.get("/profile", protect, getUserProfile);

/* ============================= */
/* 🔐 ADMIN */
/* ============================= */

router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);
router.put("/:id/block", protect, adminOnly, blockUser);
router.put("/:id/admin", protect, adminOnly, makeAdmin);

/* ============================= */
/* 🔑 PASSWORD */
/* ============================= */

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;