/**
 * emojiCreate
 * - event fired when an emoji is created
 */

require( 'dotenv' ).config();

const { CHANNEL_WELCOME_ID, CHANNEL_ADMIN_LOGS_ID } = process.env;
const { resolveColor, inlineCode } = require( 'discord.js' );

/**
 * Send a notification to the general chat and admin log
 *
 * @param {object} emoji the new emoji
 * @param {object} discord the discord client
 */
const notify = async( emoji, discord ) => {

  const channel = discord.channels.cache.get( CHANNEL_WELCOME_ID );
  const adminLog = discord.channels.cache.get( CHANNEL_ADMIN_LOGS_ID );
  const embedColor = resolveColor( 'Green' );

  const emojiCodeString = inlineCode( `:${emoji.name}:` );
  const embedDescription = `Bleep Blorp! We’ve got a new emoji <:${emoji.name}:${emoji.id}>. Use it like this: ${emojiCodeString}`;

  await emoji.fetchAuthor();

  const emojiAuthorName = `${emoji.author.username}#${emoji.author.discriminator}`;
  const emojiAuthorIcon = emoji.author.avatarURL();

  const embed = {
    title: 'Emoji Created',
    color: embedColor,
    description: embedDescription,
    author: {
      name: emojiAuthorName,
      icon_url: emojiAuthorIcon
    },
    timestamp: new Date().toISOString()
  };

  adminLog.send( { embeds: [ embed ] } );

  channel.send( { embeds: [ embed ] } ).then( ( sentMessage ) => {
    sentMessage.react( emoji.id );
  } );
}

module.exports = {
  name: 'emojiCreate',

  async execute( emoji, discord ) {

    notify( emoji, discord );
  }
}
