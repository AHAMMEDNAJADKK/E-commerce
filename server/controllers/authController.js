import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 🔐 Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🔹 REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ❌ DO NOT HASH PASSWORD HERE
    // User model will hash automatically

    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: "user",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id),
      });

    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};