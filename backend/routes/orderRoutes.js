import express from "express";
import Order from "../models/Order.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// إنشاء طلب
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products, total } = req.body;
    const order = new Order({ user: req.user._id, products, total });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "خطأ في إنشاء الطلب", error: error.message });
  }
});

// جلب كل الطلبات (مستخدم محمي)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate("user").populate("products");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب الطلبات", error: error.message });
  }
});

export default router;
