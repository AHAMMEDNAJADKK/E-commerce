import express from "express";
import Contact from "../models/Contact.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 USER SEND MESSAGE
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error("CONTACT CREATE ERROR:", error.message);
    res.status(400).json({ message: error.message });
  }
});

// 🔹 ADMIN GET ALL MESSAGES
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("GET CONTACTS ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;