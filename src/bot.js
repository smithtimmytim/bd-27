/**
 * Main Bot
 *
 */

import { Client, Partials, Collection, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

import { handleEvents, handleCommands } from './functions/handlers/index.js';

config();

const { DISCORD_BOT_TOKEN } = process.env;
const discord = new Client( {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers
  ],
  partials: [
    Partials.GuildMember,
    Partials.Message
  ]
} );

discord.commands = new Collection();
discord.commandArray = [
];

handleEvents( discord );
handleCommands( discord );

discord.login( DISCORD_BOT_TOKEN );
