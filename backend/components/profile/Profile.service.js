const repository = require("./Profile.repository");
const Profile = require("./Profile.model");
const { validateCreateRequest } = require("./Profile.validation");

// Service for the Profile

const createProfile = async (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await validateCreateRequest(userId, data);
      let result;
      // Check if user already has a profile
      const existingProfile = await repository.getByUserId(Profile, userId);

      if (existingProfile) {
        // Update profile
        result = await repository.update(Profile, existingProfile.userId, data);
      } else {
        profileObj = new Profile(data);
        profileObj.userId = userId;
        result = await repository.create(profileObj);
      }

      resolve(result);
    } catch (err) {
      if (err.isJoi === true) {
        err.status = 422;
      }
      reject(err);
    }
  });
};

const getProfile = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || userId === "") {
        throw new Error("UserId is required");
      }
      const profile = await repository.getByUserId(Profile, userId);
      resolve(profile);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createProfile,
  getProfile,
};
