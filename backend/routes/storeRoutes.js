import express from "express";
import Store from "../models/Store.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// إنشاء متجر
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const store = new Store({ name, description, owner: req.user._id });
    await store.save();
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: "خطأ في إنشاء المتجر", error: error.message });
  }
});

// جلب كل المتاجر
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find().populate("owner", "username email");
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "خطأ في جلب المتاجر", error: error.message });
  }
});

export default router;
