const express = require("express");
const router = express.Router();
const { protectUser } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

router.get("/", protectUser, getCart);
router.post("/", protectUser, addToCart);

router.put("/:productId", protectUser, updateCartItem);
router.delete("/:productId", protectUser, removeCartItem);

module.exports = router;
