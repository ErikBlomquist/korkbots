const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let embedhelp = new Discord.RichEmbed()
  .setTitle("Bot Commands", true)
  .addField("!drop"," Let the expert decide where to drop!")
  .addField("!invite"," Invite the bot to your own channel!")
  .addField("!king"," Get a link to King's stream.")
  .addField("!cls"," Clear messages, etc **!cls 5** to delete the 5 recenet messages.")
  .addField(" "," https://www.korken.xyz ")

  message.channel.send(embedhelp);
}

module.exports.help = {
  name: "helpme"
}
