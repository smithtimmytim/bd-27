/**
 * Main Bot
 *
 */

const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const { token } = process.env;
const discord = new Client({ intents: GatewayIntentBits.Guilds });

discord.commands = new Collection();
discord.commandArray = [];

const prefix = '.js';
const functionFolders = fs.readdirSync(`./src/functions`);

for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(prefix));

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(discord, prefix);
  }
}

discord.handleEvents();
discord.handleCommands();
discord.login(token);
