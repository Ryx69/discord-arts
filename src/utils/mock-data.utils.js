const DiscordArtsError = require('./error.utils');

const defaultAvatarColors = [
  '#faa61a', '#f04747', '#747f8d', '#43b581', '#faa61a',
  '#f04747', '#747f8d', '#43b581', '#faa61a', '#f04747'
];

function generateDefaultAvatar(userId) {
  const colorIndex = parseInt(userId.slice(-1), 16) % defaultAvatarColors.length;
  const color = defaultAvatarColors[colorIndex];
  
  const canvas = require('@napi-rs/canvas').createCanvas(512, 512);
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(256, 256, 256, 0, 2 * Math.PI);
  ctx.fill();
  
  // Add user initials
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 200px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const initials = userId.slice(-2).toUpperCase();
  ctx.fillText(initials, 256, 256);
  
  return canvas.toBuffer('image/png');
}

function generateMockUserData(userId, customData = {}) {
  const timestamp = Date.now();
  const createdTimestamp = timestamp - (Math.random() * 10000000000); // Random creation date
  
  const mockData = {
    basicInfo: {
      id: userId,
      username: customData.username || `User${userId.slice(-4)}`,
      globalName: customData.globalName || customData.username || `User${userId.slice(-4)}`,
      discriminator: customData.discriminator || Math.floor(Math.random() * 9999).toString().padStart(4, '0'),
      bot: customData.bot || false,
      verified: customData.verified || false,
      createdTimestamp: customData.createdTimestamp || createdTimestamp
    },
    assets: {
      avatarURL: customData.avatarURL || null,
      defaultAvatarURL: null, // Don't generate placeholder avatar
      bannerURL: customData.bannerURL || null,
      badges: [] // No external badges, only custom ones
    },
    decoration: {
      profileColors: customData.profileColors || null,
      avatarFrame: customData.avatarFrame || null
    }
  };
  
  return mockData;
}

function generateMockRankData() {
  return {
    currentXp: Math.floor(Math.random() * 1000),
    requiredXp: 1000,
    level: Math.floor(Math.random() * 100) + 1,
    rank: Math.floor(Math.random() * 100) + 1
  };
}

module.exports = {
  generateMockUserData,
  generateMockRankData,
  generateDefaultAvatar
};
