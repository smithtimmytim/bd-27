const { SlashCommandBuilder } = require( 'discord.js' );

// Command Config
const config = {
  name: 'ping',
  description: 'Returns my ping!'
}

// Register Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName( config.name )
    .setDescription( config.description ),

  async execute( interaction, discord ) {
    const message = await interaction.deferReply( {
      fetchReply: true
    } );

    const newMessage = `API Latency: ${discord.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}`;

    await interaction.editReply( {
      content: newMessage
    } );
  }

}
