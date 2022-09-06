import { SlashCommandBuilder, resolveColor } from 'discord.js';
import { config as dotConfig } from 'dotenv';

dotConfig();

const { SERVER_ID } = process.env;

// Command Config
const config = {
  name: 'server',
  description: 'Get some quick info on the server.'
}

// Register Command
export default {
  data: new SlashCommandBuilder()
    .setName( config.name )
    .setDescription( config.description ),

  async execute( interaction, discord ) {

    const guild = discord.guilds.cache.get( SERVER_ID );
    const embedColor = resolveColor( 'Purple' );
    const humanCount = guild.members.cache.filter( ( member ) => !member.user.bot ).size;
    const embedDescription = 'Here\u2019s some information about the server';

    const embed = {
      title: 'Server Information',
      color: embedColor,
      description: embedDescription,
      fields: [
        {
          name: 'Members',
          value: humanCount
        },
        {
          name: 'Server Owner',
          value: '<@548616858996178950>'
        }
      ],
      timestamp: new Date().toISOString()
    };

    interaction.reply( {
      embeds: [
        embed
      ]
    } );
  }
}
