const CreateError = require("http-errors");
const repository = require("./Project.repository");
const Project = require("./Project.model");
const { validateCreateRequest } = require("./Project.validation");

// Service for Project

const getUniqueArrayElements = (a, b) => {
  // Use Set to get unique values
  // return [...new Set([...a, ...b])];

  // Use array.filter to get unique values
  return a.concat(b.filter((item) => a.indexOf(item) < 0));
};

const createProject = async (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await validateCreateRequest(userId, data);
      const projectNew = data.project;
      let result;
      // Check if the project already exists for the userId
      let projectOld = await repository.getByUserId(Project, userId);

      if (projectOld) {
        // Add the new project to the existing project if it is not already present and if present, update the existing project
        let projects = projectOld.projects;
        let projectExists = projects.find(
          (project) => project.name === projectNew.name
        );
        let projectsOmmitedNewOne = projects.filter(
          (project) => project.name !== projectNew.name
        );
        if (projectExists) {
          projectExists.description = projectNew.description;
          projectExists.skills = getUniqueArrayElements(
            projectExists.skills,
            projectNew.skills
          );
          data.projects = [...projectsOmmitedNewOne, projectExists];
        } else {
          data.projects = [...projects, projectNew];
        }

        result = await repository.update(Project, userId, data);
      } else {
        data.projects = [projectNew];
        const projectObj = new Project(data);
        projectObj.userId = userId;
        result = await repository.create(projectObj);
      }
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

const getProjectsByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    try {
      if (!userId || userId === "") {
        throw new Error("UserId is required");
      }
      let result = repository.getByUserId(Project, userId);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

const getAllProjects = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await repository.list(Project, { limit: 10 });
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createProject,
  getProjectsByUserId,
};
