const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protectAdmin, protectUser } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const { productValidation } = require("../validations/productValidation");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
} = require("../controllers/productController");

// PUBLIC
router.get("/", getProducts);
router.get("/:id", getProductById);

// USER (REVIEWS)
router.post("/:id/reviews", protectUser, addReview);

// ADMIN ONLY
router.post(
  "/",
  protectAdmin,
  upload.single("image"),
  validate(productValidation),
  createProduct
);

router.put(
  "/:id",
  protectAdmin,
  upload.single("image"),
  validate(productValidation),
  updateProduct
);

router.delete("/:id", protectAdmin, deleteProduct);

module.exports = router;
