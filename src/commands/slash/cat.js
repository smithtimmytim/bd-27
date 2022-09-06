import { SlashCommandBuilder } from 'discord.js';
import { config as dotConfig } from 'dotenv';

import { randomCatApi } from '../../library/urls.js';
import { makeApiCall, getRandomCatEmoji } from '../../library/utils.js';

dotConfig();

// const { SERVER_ID } = process.env;

// Command Config
const config = {
  name: 'cat',
  description: 'Get back a random kitty',
  color: 'Purple'
}

// Register Command
export default {
  data: new SlashCommandBuilder()
    .setName( config.name )
    .setDescription( config.description ),

  async execute( interaction ) {

    try {
      await interaction.deferReply();

      const data =  await makeApiCall( randomCatApi() );

      const catPhoto = data.file;

      const message = await interaction.editReply( {
        files: [
          catPhoto
        ]
      } );

      await message.react( getRandomCatEmoji() );
      await message.react( getRandomCatEmoji() );
    } catch ( error ) {
      console.error( error );
    }

  }
}
