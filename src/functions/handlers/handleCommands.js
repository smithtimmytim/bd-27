const { REST } = require( '@discordjs/rest' );
const { Routes } = require( 'discord-api-types/v9' );
const fs = require( 'fs' );
require( 'dotenv' )
  .config();

const { DISCORD_BOT_TOKEN, BOT_ID, SERVER_ID } = process.env;

module.exports = ( discord, prefix ) => {
  discord.handleCommands = async() => {
    const { commands, commandArray } = discord;
    const commandFolders = fs.readdirSync( './src/commands' );

    for ( const folder of commandFolders ) {
      const commandFiles = fs
        .readdirSync( `./src/commands/${folder}` )
        .filter( ( file ) => file.endsWith( prefix ) );

      for ( const file of commandFiles ) {
        const command = require( `../../commands/${folder}/${file}` );
        commands.set( command.data.name, command );
        commandArray.push( command.data.toJSON() );
        console.log( `Command: ${command.data.name} has passed through handler` );
      }
    }

    const botID = BOT_ID;
    const serverID = SERVER_ID;

    const rest = new REST( {
      version: '10'
    } )
      .setToken( DISCORD_BOT_TOKEN );

    try {
      console.log( "Refreshing server (/) commands." );

      await rest.put( Routes.applicationGuildCommands( botID, serverID ), {
        body: commandArray
      } );

    } catch ( error ) {
      console.error( error );
    }
  }
}
