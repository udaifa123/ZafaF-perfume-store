const express = require("express");
const router = express.Router();
const { protectUser } = require("../middleware/authMiddleware");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist
} = require("../controllers/wishlistController"); 

router.post("/", protectUser, addToWishlist);
router.get("/", protectUser, getWishlist);
router.delete("/:id", protectUser, removeFromWishlist);

module.exports = router;
