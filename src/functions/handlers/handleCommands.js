import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
import { config } from 'dotenv';
import { botLog } from '../../library/utils.js';

config();

const { DISCORD_BOT_TOKEN, BOT_ID, SERVER_ID } = process.env;

export default async ( discord ) => {
  const { commands, commandArray } = discord;
  const commandFolders = fs.readdirSync( './src/commands' );

  for await ( const folder of commandFolders ) {
    const commandFiles = fs.readdirSync( `./src/commands/${folder}` );

    for await ( const file of commandFiles ) {
      const command = await import( `../../commands/${folder}/${file}` );

      commands.set( command.default.data.name, command.default );
      commandArray.push( command.default.data.toJSON() );
      botLog( `Command: ${command.default.data.name} has passed through handler` );
    }
  }

  const rest = new REST( {
    version: '10'
  } )
    .setToken( DISCORD_BOT_TOKEN );

  try {
    botLog( 'Refreshing server (/) commands.' );

    await rest.put( Routes.applicationGuildCommands( BOT_ID, SERVER_ID ), {
      body: commandArray
    } );

  } catch ( error ) {
    console.error( error );
  }
}
