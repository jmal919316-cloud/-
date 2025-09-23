import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// تسجيل مستخدم جديد
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "المستخدم موجود مسبقًا" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "تم التسجيل بنجاح ✅" });
  } catch (error) {
    res.status(500).json({ message: "خطأ في التسجيل", error: error.message });
  }
});

// تسجيل الدخول
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "المستخدم غير موجود" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "كلمة المرور غير صحيحة" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "تم تسجيل الدخول بنجاح ✅", token });
  } catch (error) {
    res.status(500).json({ message: "خطأ في تسجيل الدخول", error: error.message });
  }
});

export default router;
