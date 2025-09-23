import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// إنشاء منتج
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, price, store } = req.body;
    const product = new Product({ name, price, store });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "خطأ في إنشاء المنتج", error: error.message });
  }
});

// جلب كل المنتجات
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("store");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب المنتجات", error: error.message });
  }
});

export default router;
