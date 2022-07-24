const createError = require("http-errors");

const validateCreateRequest = async (userId, data) => {
  if (!userId || userId === "") {
    throw new createError(400, "Userid is required");
  }
  if (!data.project) {
    throw new createError(400, "Project is required");
  }
  if (!data.project.name || data.project.name === "") {
    throw new createError(400, "Project name is required");
  }
  if (!data.project.description || data.project.description === "") {
    throw new createError(400, "Project description is required");
  }
};

module.exports = {
  validateCreateRequest,
};
