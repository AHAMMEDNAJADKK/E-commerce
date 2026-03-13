import Order from "../models/Order.js";
import { Parser } from "json2csv";

/* =====================================================
   CREATE ORDER
===================================================== */
export const createOrder = async (req, res) => {
  try {
    console.log("ORDER REQUEST BODY:", req.body);

    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();

    console.log("ORDER SAVED:", createdOrder._id);

    res.status(201).json(createdOrder);

  } catch (error) {
    console.error("ORDER SAVE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   GET SINGLE ORDER
===================================================== */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email phone");

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   GET MY ORDERS
===================================================== */
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ADMIN: GET ALL ORDERS
===================================================== */
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ADMIN: MARK ORDER AS PAID
===================================================== */
export const markOrderPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.isPaid = true;
    order.paidAt = Date.now();

    await order.save();

    res.json({ message: "Order marked as paid" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ADMIN: MARK ORDER AS DELIVERED
===================================================== */
export const markOrderDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order)
      return res.status(404).json({ message: "Order not found" });

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();

    res.json({ message: "Order marked as delivered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ADMIN DASHBOARD STATS (Optimized)
===================================================== */
export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRevenueData = await Order.aggregate([
      {
        $match: {
          isPaid: true,
          createdAt: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const todayRevenue = todayRevenueData[0]?.revenue || 0;

    const firstDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const monthRevenueData = await Order.aggregate([
      {
        $match: {
          isPaid: true,
          createdAt: { $gte: firstDayOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    const monthRevenue = monthRevenueData[0]?.revenue || 0;

    res.json({
      totalOrders,
      totalRevenue,
      todayRevenue,
      monthRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ADMIN: EXPORT ORDERS AS CSV
===================================================== */
export const exportOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email");

    const formattedOrders = orders.map((o) => ({
      OrderID: o._id,
      CustomerName: o.user?.name,
      CustomerEmail: o.user?.email,
      TotalPrice: o.totalPrice,
      Paid: o.isPaid ? "Yes" : "No",
      Delivered: o.isDelivered ? "Yes" : "No",
      CreatedAt: o.createdAt,
    }));

    const parser = new Parser();
    const csv = parser.parse(formattedOrders);

    res.header("Content-Type", "text/csv");
    res.attachment("orders.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ADMIN: TOP SELLING PRODUCTS (Optimized + Name)
===================================================== */
export const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Order.aggregate([
      { $match: { isPaid: true } }, // Only count paid orders
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.name",
          totalSold: { $sum: "$orderItems.qty" },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $project: {
          _id: 0,
          name: "$_id",
          quantity: "$totalSold",
        },
      },
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};