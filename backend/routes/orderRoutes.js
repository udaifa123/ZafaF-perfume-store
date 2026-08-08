const express = require("express");
const router = express.Router();
const { protectUser } = require("../middleware/authMiddleware");

const {
  createOrder,
  getUserOrders,
  cancelOrder,
  clearCanceledOrders,
  requestReturn,
  requestCancellation 
} = require("../controllers/orderController");

router.post("/", protectUser, createOrder);
router.get("/", protectUser, getUserOrders);
router.put("/:id/cancel", protectUser, cancelOrder);
router.delete("/clear-canceled", protectUser, clearCanceledOrders);

// RETURN ORDER
router.post("/return", protectUser, requestReturn);

// REQUEST CANCEL
router.post("/:id/request-cancel", protectUser, requestCancellation);

module.exports = router;
