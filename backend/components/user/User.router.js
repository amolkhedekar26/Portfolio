const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refreshToken,
  forgotPassword,
  verifyEmail,
  resetPassword,
  changePassword,
  logout,
} = require("../user/User.controller");

// Add the User Authentication routes
router.post("/login", login);

router.post("/register", register);

router.post("/refresh-token", refreshToken);

router.get("/forgot-password", forgotPassword);

router.post("/verify-email", verifyEmail);

router.get("/reset-password/:id/:resetToken", resetPassword);

router.post("/change-password", changePassword);

router.delete("/logout", logout);

// Export the router
module.exports = router;