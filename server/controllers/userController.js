import User from "../models/User.js";

// 🔹 Get Logged-in User Profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

// 🔹 Get All Users (Admin)
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
};

// 🔹 Delete User (Admin)
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.deleteOne();
  res.json({ message: "User deleted successfully" });
};
