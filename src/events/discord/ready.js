module.exports = {
  name: 'ready',
  once: true,

  async execute( discord ) {
    console.log(`Ready!! ${discord.user.tag} is logged in and online.`);
  }
}
