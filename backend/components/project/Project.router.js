const express = require("express");
const router = express.Router();

// Router for the Project routes

const { createProject, getProjectsByUserId } = require("./Project.controller");

// Add the Projec routes
router.post("/", createProject);

router.get("/", getProjectsByUserId);

// Export the router
module.exports = router;
