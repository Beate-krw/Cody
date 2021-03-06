const courses = require('../../questions/courses.json')
const Discord = require('discord.js')

module.exports = {
  name: 'courses',
  category: '🌐 Learn how to Code',
  description: "Displays all cody's current available courses",

  run: async (client, message, args, user, guild) => {
    if (!message.guild.me.permissions.has('SEND_MESSAGES')) return
    if (
      !message.guild.me.permissions.has([
        'EMBED_LINKS',
        'ADD_REACTIONS',
        'SEND_MESSAGES',
        'READ_MESSAGE_HISTORY',
        'VIEW_CHANNEL',
      ])
    ) {
      return message.channel.send({ content: `
      ❌ I require some Permissions!

      **I need the following Permissions to work on your Server:**
      EMBED_LINKS,
      ADD_REACTIONS, 
      SEND_MESSAGES, 
      READ_MESSAGE_HISTORY,
      VIEW_CHANNEL

      ⚠️ Please add me the right Permissions and re-run this Command!
  
      `})
    }

    const embed = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setTitle("Cody's available Courses")
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true }),
      )
      .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))

    for (let course of courses.courses) {
      const description = require(`../../questions/${course}.json`)
      const levels = Object.keys(description[0]).length
      embed.addField(
        course,
        `${courses.course_descriptions[course]} **(${levels} Levels)** ${
          courses.premium_courses.includes(course) ? ` \`- premium\`` : ''
        }`,
      )
    }

    message.channel.send({ embeds: [embed] })
  },
}
