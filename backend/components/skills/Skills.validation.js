const CreateError = require("http-errors");

const validateCreateRequest = async(userId, data) => {
    if (!userId || userId === "") {
        throw new CreateError(400, "Userid is required");
    }
    if (!data.skill) {
        throw new CreateError(400, "Skill is required");
    }
    if (!data.skill.name || data.skill.name === "") {
        throw new CreateError(400, "Skill name is required");
    }
    if (!data.skill.level || data.skill.level === "") {
        throw new CreateError(400, "Skill level is required");
    }
}

module.exports = {
    validateCreateRequest,
}