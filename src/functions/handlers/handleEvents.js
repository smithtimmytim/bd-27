/**
 * Event Handler
 * - listens for and runs correct callback function
 */

import fs from 'fs';
import { botLog } from '../../library/utils.js';

export default async ( discord ) => {
  const eventsFolders = fs.readdirSync( './src/events' );

  botLog( 'Events: Listening...' );

  for await ( const folder of eventsFolders ) {
    const eventFiles = fs.readdirSync( `./src/events/${folder}` );

    switch ( folder ) {
    case 'discord':

      for await ( const file of eventFiles ) {
        const event = await import( `../../events/${folder}/${file}` );

        if ( event.default.once )
          discord.once( event.default.name, ( ...args ) => {
            event.default.execute( ...args, discord );
          } );
        else
          discord.on( event.default.name, ( ...args ) => {
            event.default.execute( ...args, discord );
          } );

      }
      break;

    default:
      break;
    }
  }
}
