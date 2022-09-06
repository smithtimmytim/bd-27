/**
 * Ready Event
 */

import { botLog } from '../../library/utils.js';
import { config } from 'dotenv';
config();

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';


export default {
  name: 'ready',
  once: true,

  async execute( discord ) {
    if ( !isProduction ) discord.user.setUsername( 'BD-27.dev' );

    discord.user.setPresence( {
      activities: [
        {
          name: 'cantina jazz 🎶',
          type: 2
        }
      ],
      status: 'online'
    } );

    botLog( `Event: ready ${discord.user.tag} is logged in and online` );
  }
}
