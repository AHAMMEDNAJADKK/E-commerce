import Order from "../models/Order.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      totalPrice,
      isPaid: false,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE ORDER
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};

// GET MY ORDERS
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// ADMIN: GET ALL ORDERS
export const getOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "id name");
  res.json(orders);
};