const Discord = require("discord.js");
const Client = require('fortnite');
const fortnite = new Client("e5c2d338-ce49-429a-b5a0-0be293c58e3e");

module.exports.run = async (bot, message, args) => {
  //message.delete();
  // !fortify
  let username = args[0];
  let platform = args[1] || "pc";

  if(!username) return message.reply("Please provide a username.")

  let data = fortnite.user(username, platform).then(data => {
    // Seasonal Stats
    let stats = data.stats;
    let lifetime = stats.lifetime;
    let current_solo = stats.current_solo;
    let current_duo = stats.current_duo;
    let current_squad = stats.current_squad;

    // current_solo
    let cs_score = current_solo['score'];
    let cs_kd = current_solo['kd'];
    let cs_matches = current_solo['matches'];
    let cs_kills = current_solo['kills'];
    let cs_wins = current_solo['wins'];
    // current_duo
    let cd_score = current_duo['score'];
    let cd_kd = current_duo['kd'];
    let cd_matches = current_duo['matches'];
    let cd_kills = current_duo['kills'];
    let cd_wins = current_duo['wins'];
    // current_squad
    let csq_score = current_squad['score'];
    let csq_kd = current_squad['kd'];
    let csq_matches = current_squad['matches'];
    let csq_kills = current_squad['kills'];
    let csq_wins = current_squad['wins'];

    let wins = lifetime[8]['Wins'];

    // current_solo
    let embedsolo = new Discord.RichEmbed()
//    .setTitle("Solo")
//    .setAuthor(data.username)
//    .setColor("#00FF00")
    .addField("Wins", cs_wins, true)
    .addField("Kills/Death", cs_kd, true)
//    .addField("Kills", cs_kills, true)
//    .addField("Score", cs_score, true)
    .addField("Matches Played", cs_matches, true)
//    .addField("Win%", "Coming soon", true);

    // current_duo
    let embedduo = new Discord.RichEmbed()
//    .setTitle("Duo")
//    .setColor("#0000FF")
    .addField("Wins", cd_wins, true)
    .addField("Kills/Death", cd_kd, true)
//    .addField("Kills", cd_kills, true)
//    .addField("Score", cd_score, true)
    .addField("Matches Played", cd_matches, true)
//    .addField("Win%", "Coming soon", true)
    .addBlankField(true);

    // print current_squad
    let embedsquad = new Discord.RichEmbed()
//    .setTitle("Squad")
//    .setColor("#FF0000")
    .addField("Wins", csq_wins, true)
    .addField("Kills/Death", csq_kd, true)
//    .addField("Kills", csq_kills, true)
//    .addField("Score", csq_score, true)
    .addField("Matches Played", csq_matches, true)
//    .addField("Win%", "Coming soon", true);
  
    // print current_total
    let embedtot = new Discord.RichEmbed()
    .setTitle("SEASON 5")
    .setAuthor(data.username)
    .setColor("#FF33FF")
    .addField("S5 Wins", csq_wins + cs_wins + cd_wins, true)
    .addField("S5 Kills/Death", ((csq_kd + cs_kd + cd_kd) / 3).toFixed(2), true)
  //  .addField("Kills", csq_kills + cs_kills + cd_kills, true)
  //  .addField("Score", csq_score + cs_score + cd_score, true)
    .addField("S5 Matches Played", csq_matches + cs_matches + cd_matches, true)

    .addField("Solo Wins", cs_wins, true)
    .addField("Solo Kills/Death", cs_kd, true)
//    .addField("Kills", cs_kills, true)
//    .addField("Score", cs_score, true)
    .addField("Solo Matches Played", cs_matches, true)

    .addField("Duo Wins", cd_wins, true)
    .addField("Duo Kills/Death", cd_kd, true)
//    .addField("Kills", cd_kills, true)
//    .addField("Score", cd_score, true)
    .addField("Duo Matches Played", cd_matches, true)

    .addField("Squad Wins", csq_wins, true)
    .addField("Squad Kills/Death", csq_kd, true)
//    .addField("Kills", csq_kills, true)
//    .addField("Score", csq_score, true)
    .addField("Squad Matches Played", csq_matches, true);


  //  .addField("Win%", "Coming soon", true);

    message.channel.send(embedtot);
  //  message.channel.send(embedsolo);
  //  message.channel.send(embedduo);
  //  message.channel.send(embedsquad);

  });


}

module.exports.help = {
  name: "s5"
}
