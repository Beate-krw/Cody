const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "servers",
  cooldown: 10,
  category: "👑 Owner",
  description:"Lists Codys Servers",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    if (message.author.id !== "578678204890349594") {
      return message.channel.send(
        ":x: | You are not allowed to use this Command"
      );
    }

    const servers = message.client.guilds.cache.array().map((guild) => {
      return `\`${guild.id}\` - **${guild.name}** - \`${guild.memberCount}\` members`;
    });

    const embed = new MessageEmbed()
      .setTitle("Server List")
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);

    if (servers.length <= 10) {
      const range = servers.length == 1 ? "[1]" : `[1 - ${servers.length}]`;
      message.channel.send(
        embed
          .setTitle(`Server List ${range}`)
          .setDescription(servers.join("\n"))
      );
    }
  },
};
