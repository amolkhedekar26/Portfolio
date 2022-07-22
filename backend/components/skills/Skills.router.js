const express = require("express");
const router = express.Router();

const { createSkills, getSkillsByUserId } = require("./Skills.controller");

// Add the Skills routes
router.post("/", createSkills);

router.get("/", getSkillsByUserId);


// Export the router
module.exports = router;
