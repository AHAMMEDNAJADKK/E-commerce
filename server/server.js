import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { protect, adminOnly } from "./middleware/authMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import paymentRoutes from "./routes/paymentRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use(notFound);
app.use(errorHandler);
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
  res.send("API Running");
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
