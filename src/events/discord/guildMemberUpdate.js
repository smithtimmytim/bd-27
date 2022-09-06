/**
 * Guild Member Update Event
 *
 */

import { resolveColor } from 'discord.js';
import { config } from 'dotenv';
config();


const { ROLE_VERIFIED_ID, ROLE_WELCOME_ID, CHANNEL_WELCOME_ID, CHANNEL_ADMIN_LOGS_ID } = process.env;

/**
 * Handle when a member receives the Verified role
 *
 * @param {object} newMember The member after the update
 * @param {object} discord The Discord Client
 */
const handleAddVerifiedRole = ( newMember, discord ) => {

  const memberName = `${newMember.user.username}#${newMember.user.discriminator}`;
  const memberIcon = newMember.user.avatarURL();
  const embedColor = resolveColor( 'Green' );

  const welcomeMessage = `Bleep Blorp! <@${newMember.id}> is now on the verified side \:wave: \:partying_face: <@&${ROLE_WELCOME_ID}>`;
  const welcomeChannel = discord.channels.cache.get( CHANNEL_WELCOME_ID );

  welcomeChannel.send( welcomeMessage );

  const logEmbed = {
    title: `Welcomed New Verified User in #${welcomeChannel.name}`,
    color: embedColor,
    author: {
      name: memberName,
      icon_url: memberIcon
    },

    fields: [
      {
        name: 'Message',
        value: welcomeMessage
      },
      {
        name: 'Channel',
        value: `<#${welcomeChannel.id}>`
      }
    ],
    timestamp: new Date()
      .toISOString()
  };

  const logChannel = discord.channels.cache.get( CHANNEL_ADMIN_LOGS_ID );

  logChannel.send( {
    embeds: [
      logEmbed
    ]
  } );
}

export default {
  name: 'guildMemberUpdate',

  async execute( oldMember, newMember, discord ) {

    const addedRoles = newMember.roles.cache.filter( ( role ) => !oldMember.roles.cache.has( role.id ) );

    if ( addedRoles.size > 0 ) {

      const isVerfied = addedRoles.find( ( role ) => role.id === ROLE_VERIFIED_ID );

      if ( isVerfied ) handleAddVerifiedRole( newMember, discord );
    }
  }
}
