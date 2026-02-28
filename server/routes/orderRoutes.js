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
  getAdminDashboardStats
} from "../controllers/orderController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);

router.get("/myorders", protect, getMyOrders);

router.get("/export/csv", protect, adminOnly, exportOrders);
router.get("/analytics/top-products", protect, adminOnly, getTopProducts);

router.get("/", protect, adminOnly, getOrders);

router.put("/:id/pay", protect, adminOnly, markOrderPaid);
router.put("/:id/deliver", protect, adminOnly, markOrderDelivered);

router.get("/:id", protect, getOrderById);
router.get("/admin/stats", protect, adminOnly, getAdminDashboardStats);
router.get("/admin/export", protect, adminOnly, exportOrders);
router.get("/admin/top-products", protect, adminOnly, getTopProducts);

export default router;