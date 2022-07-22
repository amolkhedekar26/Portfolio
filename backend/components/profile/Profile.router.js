const express = require("express");
const router = express.Router();

// Router for Profile

const { createProfile, getProfile } = require("./Profile.controller");

// Add the Projec routes
router.post("/", createProfile);

router.get("/", getProfile);

// Export the router
module.exports = router;
