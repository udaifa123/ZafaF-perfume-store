const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require("../models/Admin");

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// --- User ---
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });
  res.status(201).json({ token: generateToken(user._id), user });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  //  BLOCK CHECK (IMPORTANT)
  if (user.isBlocked === true) {
    return res.status(403).json({
      message: "Your account is blocked. Please contact admin.",
      blocked: true,
    });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: generateToken(user._id),
    user,
  });
};


// --- Admin ---
exports.registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await Admin.findOne({ email });
  if (exists) return res.status(400).json({ message: "Admin already exists" });

  const admin = await Admin.create({ name, email, password });
  res.status(201).json({ token: generateToken(admin._id), admin });
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid admin credentials" });
  }
  res.json({ token: generateToken(admin._id), admin });
};


exports.getMe = async (req, res) => {
  res.json(req.user);
};

exports.updateProfile = async (req, res) => {
  const user = req.user;

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;
  user.preferences = req.body.preferences || user.preferences;

  const updatedUser = await user.save();
  res.json(updatedUser);
};

exports.changePassword = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return res.status(400).json({ message: "Current password incorrect" });
  }

  user.password = req.body.newPassword;
  await user.save();

  res.json({ message: "Password updated successfully" });
};

exports.deleteAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: "Account deleted successfully" });
};
