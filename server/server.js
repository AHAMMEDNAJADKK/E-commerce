import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

/* ============================= */
/* 🔥 ROUTE IMPORTS */
/* ============================= */

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

/* ============================= */

import { protect, adminOnly } from "./middleware/authMiddleware.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

/* ============================= */
/* 🔥 CONNECT DATABASE */
/* ============================= */

connectDB();

/* ============================= */
/* 🔥 INIT APP */
/* ============================= */

const app = express();

/* ============================= */
/* 🔥 MIDDLEWARE */
/* ============================= */

app.use(cors());
app.use(express.json());

/* Disable caching (fix 304 issue) */
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

/* Serve uploaded files */
app.use("/uploads", express.static("uploads"));

/* ============================= */
/* 🔥 API ROUTES */
/* ============================= */

/* Auth Routes (LOGIN) */
app.use("/api/auth", authRoutes);

/* User Routes (REGISTER + PROFILE + ADMIN) */
app.use("/api/users", userRoutes);

/* Products */
app.use("/api/products", productRoutes);

/* Orders */
app.use("/api/orders", orderRoutes);

/* Payments */
app.use("/api/payment", paymentRoutes);

/* Contact */
app.use("/api/contact", contactRoutes);

/* ============================= */
/* 🔥 TEST ROUTES */
/* ============================= */

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

app.get("/api/test-user", protect, (req, res) => {
  res.json({
    message: "Protected route working",
    user: req.user,
  });
});

app.get("/api/test-admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Admin route working",
  });
});

/* ============================= */
/* 🔥 ERROR HANDLERS */
/* ============================= */

app.use(notFound);
app.use(errorHandler);

/* ============================= */
/* 🔥 START SERVER */
/* ============================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});