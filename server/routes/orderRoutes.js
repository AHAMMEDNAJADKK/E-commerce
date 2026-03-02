import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrders,
  getOrderById,
  markOrderPaid,
  markOrderDelivered,
  exportOrders,
  getTopProducts,
  getAdminDashboardStats,
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// User
router.post("/", protect, createOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

// Admin
router.get("/", protect, adminOnly, getOrders);
router.get("/admin/stats", protect, adminOnly, getAdminDashboardStats);
router.get("/admin/top-products", protect, adminOnly, getTopProducts);
router.get("/admin/export", protect, adminOnly, exportOrders);

router.put("/:id/pay", protect, adminOnly, markOrderPaid);
router.put("/:id/deliver", protect, adminOnly, markOrderDelivered);

export default router;