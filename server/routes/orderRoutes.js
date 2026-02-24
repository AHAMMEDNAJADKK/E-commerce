import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrders,
  getOrderById
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById); // IMPORTANT
router.get("/", protect, adminOnly, getOrders);

export default router;