module.exports = {
  name: 'interactionCreate',

  async execute(interaction, discord) {
    if(interaction.isChatInputCommand()){
      const { commands } = discord;
      const { commandName } = interaction;
      const command = commands.get(commandName);

      if (!command) return;

      try {
        await command.execute(interaction, discord);

      } catch (error) {

        console.error(error);

        await interaction.reply({
          content: `Something went wrong executing this command\n${error}`,
          ephemeral: true
        })
      }
    }
  }
}
