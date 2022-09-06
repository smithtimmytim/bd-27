/**
 * Ready Event
 */

import { botLog, messageIncludesWord, messageIncludesWords } from '../../library/utils.js';
import { greetings } from '../../library/lists.js';
import { config } from 'dotenv';
config();

const initReactions = async ( msg ) => {

  if( msg.author.bot ) return;

  if( messageIncludesWord( msg, 'taco' ) )
    await msg.react( '🌮' );

  if( messageIncludesWord( msg, 'burrito' ) )
    await msg.react( '🌯' );

  if ( messageIncludesWords( msg, [
    'puerto rico',
    'boricua'
  ] ) )
    await msg.react( '🇵🇷' );

  if ( messageIncludesWords( msg, [
    'guatemala',
    'chapin',
    'guate'
  ] ) )
    await msg.react( '🇬🇹' );

  if ( messageIncludesWords( msg, [
    'ganja',
    'weed',
    'pot',
    'kush',
    '420'
  ] ) )
    await msg.react( '🌿' );

  if ( messageIncludesWords( msg, greetings ) )
    await msg.react( '👋' );

  if ( messageIncludesWord( msg, 'water' ) )
    await msg.react( '💧' );

  if ( messageIncludesWord( msg, 'morning' ) )
    await msg.react( '🌅' );

  botLog( 'Event: initReactions has passed handler' );
}

export default {
  name: 'messageCreate',

  async execute( msg ) {

    botLog( 'Event: messageCreate has passed through the handler' );

    try {
      await initReactions( msg );
    } catch ( error ) {
      console.error( 'There was an error with a reaction: \n', error );
    }

  }
}
