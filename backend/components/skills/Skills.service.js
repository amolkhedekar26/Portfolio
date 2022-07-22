const CreateError = require("http-errors");
const repository = require("./Skills.repository");
const Skills = require("../skills/Skills.model");

const getSkillsByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    try {
      let result = repository.getByUserId(Skills, userId);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createSkills: async (userId, data) => {
    return new Promise(async (resolve, reject) => {
      // const userId = data.userId;
      const skillNew = data.skill;

      if (!userId) {
        reject(new CreateError(400, "Userid is required"));
      }

      if (!skillNew) {
        reject(CreateError(400, "Skill is required"));
      }

      if (!skillNew.name) {
        reject(CreateError(400, "Skill name is required"));
      }

      if (!skillNew.level) {
        reject(new CreateError("Skill level is required"));
      }

      try {
        // Check if the skills already exists for the userId
        let skillsOld = await repository.getByUserId(Skills, userId);
        let result;
        if (skillsOld) {
          // Add the new skill to the existing skills if it is not already present and if present, update the existing skill
          let skills = skillsOld.skills;
          let skillExists = skills.find(
            (skill) => skill.name === skillNew.name
          );
          let skillsOmmitedNewOne = skills.filter(
            (skill) => skill.name !== skillNew.name
          );
          if (skillExists) {
            skillExists.level = skillNew.level;
            data.skills = [...skillsOmmitedNewOne, skillExists];
          } else {
            data.skills = [...skills, skillNew];
          }

          result = await repository.update(Skills, userId, data);
        } else {
          data.skills = [skillNew];
          const skillObj = new Skills(data);
          skillObj.userId = userId;
          result = await repository.create(skillObj);
        }
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },

  getAllSkills: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await repository.list(Skills, { limit: 10 });
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  },
  getSkillsByUserId,
};
