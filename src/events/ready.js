const client = require('../../src/index')
const User = require('../database/schemas/User')
const Guild = require('../database/schemas/Guild')

client.on('ready', async () => {
  console.log(`${client.user.tag} is now online!`)

  client.user.setActivity('$help • cody-bot.xyz', { type: 'PLAYING' })

  const users = await User.find()
  for (let user of users) {
    client.userSettings.set(user.Id, user)
  }

  const guilds = await Guild.find()
  for (let guild of guilds) {
    client.guildSettings.set(guild.Id, guild)
  }

  require("../handlers/premium")(client)
})
