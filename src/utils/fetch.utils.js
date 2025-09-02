const DiscordArtsError = require("./error.utils");
const { generateMockUserData } = require("./mock-data.utils");

async function fetchUserData(userId, customData = {}) {
  try {
    if (customData.username || customData.avatarURL) {
      const userData = generateMockUserData(userId, customData);
      return userData;
    }
    
    const mockData = generateMockUserData(userId, customData);
    return mockData;
  } catch (error) {
    throw new DiscordArtsError(
      error?.message || "Failed to generate user data"
    );
  }
}

module.exports = fetchUserData;
