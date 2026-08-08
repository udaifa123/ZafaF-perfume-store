const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

/* ================= USER PROTECT ================= */
exports.protectUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};

/* ================= ADMIN PROTECT ================= */
exports.protectAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) return res.status(401).json({ message: "Admin not found" });

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};
