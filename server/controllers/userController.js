import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";



/* =====================================================
   LOGIN USER  🔥 BLOCK CHECK ADDED HERE
===================================================== */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔥 BLOCK CHECK
    if (user.isBlocked) {
      return res.status(403).json({ message: "User is blocked by admin" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
      token: generateToken(user._id),
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* =====================================================
   GET LOGGED-IN USER PROFILE
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
   BLOCK / UNBLOCK USER (ADMIN)
===================================================== */
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

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
   PROMOTE USER TO ADMIN (ADMIN)
===================================================== */
export const makeAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin";
    await user.save();

    res.json({ message: "User promoted to admin successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};