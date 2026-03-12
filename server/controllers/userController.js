import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

/* =====================================================
   REGISTER USER  ✅ FIXED
===================================================== */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   LOGIN USER
===================================================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "User is blocked by admin" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isBlocked: user.isBlocked,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   GET USER PROFILE
===================================================== */
export const getUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   GET ALL USERS (ADMIN)
===================================================== */
export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find({}).select("-password");

    res.json(users);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   DELETE USER (ADMIN)
===================================================== */
export const deleteUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   BLOCK / UNBLOCK USER
===================================================== */
export const blockUser = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;

    await user.save({ validateBeforeSave: false });

    res.json({
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   MAKE ADMIN
===================================================== */
export const makeAdmin = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin";

    await user.save({ validateBeforeSave: false });

    res.json({ message: "User promoted to admin successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   FORGOT PASSWORD
===================================================== */
export const forgotPassword = async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await User.updateOne(
      { _id: user._id },
      {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: resetPasswordExpire,
      }
    );

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const message = `
You requested a password reset.

Click the link below:
${resetUrl}

This link expires in 15 minutes.
`;

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      text: message,
    });

    res.json({ message: "Reset link sent to email" });

  } catch (error) {
    res.status(500).json({ message: "Email could not be sent" });
  }
};

/* =====================================================
   RESET PASSWORD
===================================================== */
export const resetPassword = async (req, res) => {
  try {

    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    res.json({ message: "Password reset successful" });

  } catch (error) {
    res.status(500).json({ message: "Password reset failed" });
  }
};