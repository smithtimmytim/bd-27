const fs = require('fs');

module.exports = (discord, prefix) => {
  discord.handleEvents = async () => {
    const eventsFolders = fs.readdirSync('./src/events');

    for ( const folder of eventsFolders ) {
      const eventFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(prefix));

      switch ( folder ) {
      case "discord":
        for (const file of eventFiles) {
          const event = require(`../../events/${folder}/${file}`);
          if (event.once)
            discord.once(event.name, (...args) =>
              event.execute(...args, discord)
            );
          else
            discord.on(event.name, (...args) =>
              event.execute(...args, discord)
            );
        }
        break;

      default:
        break;
      }
    }
  };
};
