const DiscordArtsError = require('../utils/error.utils');
const fetchUserData = require('../utils/fetch.utils');
const { genPng } = require('../utils/profile-image.output.utils');

async function profileImage(userId, options = {}) {
  if (!userId || typeof userId !== 'string')
    throw new DiscordArtsError(
      `TypeError: Invalid argument for profileImage()\nExpected string userId, got ${typeof userId === 'undefined' || !userId ? 'undefined' : typeof userId}`
    );

  // Extract custom data from options
  const customData = {
    username: options.username,
    globalName: options.globalName,
    discriminator: options.discriminator,
    bot: options.bot,
    verified: options.verified,
    createdTimestamp: options.createdTimestamp,
    avatarURL: options.avatarURL,
    bannerURL: options.bannerURL,
    badges: options.customBadges,
    profileColors: options.borderColor,
    avatarFrame: options.avatarFrame
  };

  const data = await fetchUserData(userId, customData);

  try {
    const buffer = await genPng(data, options);
    return buffer;
  } catch (error) {
    if (error.message.includes('source rejected')) {
      throw new DiscordArtsError(`Error loading user assets, try again later`)
    }
    throw new DiscordArtsError(error?.message)
  }
}

module.exports = profileImage;
