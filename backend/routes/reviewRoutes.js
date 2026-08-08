const express = require("express");
const router = express.Router();

const {
  addReview,
  getMyReviews,
  getReviewById,
  updateReview,
  deleteReviewUser,
  getProductReviews,
  getAllReviewsAdmin,
  deleteReviewAdmin,
} = require("../controllers/reviewController");

const { protectUser, protectAdmin } = require("../middleware/authMiddleware");

/* ================= USER ROUTES ================= */


router.post("/:productId", protectUser, addReview);


router.get("/my", protectUser, getMyReviews);


router.get("/review/:id", protectUser, getReviewById);


router.put("/review/:id", protectUser, updateReview);


router.delete("/review/:id", protectUser, deleteReviewUser);


router.get("/product/:productId", getProductReviews);

/* ================= ADMIN ROUTES ================= */

router.get("/admin/all", protectAdmin, getAllReviewsAdmin);


router.delete("/admin/:id", protectAdmin, deleteReviewAdmin);

module.exports = router;
