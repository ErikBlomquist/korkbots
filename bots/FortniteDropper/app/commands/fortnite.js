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

    let stats = data.stats;
    let lifetime = stats.lifetime;
    let current_solo = stats.current_solo;

    console.log(data);
    // lifetime
    let score = lifetime[6]['Score'];
    let mplayed = lifetime[7]['Matches Played'];
    let wins = lifetime[8]['Wins'];
    let winper = lifetime[9]['Win%'];
    let kills = lifetime[10]['Kills'];
    let kd = lifetime[11]['K/d'];
    // current_solo
    let sscore = current_solo['score'];

    let embed = new Discord.RichEmbed()
    .setTitle("Lifetime Stats")
    .setAuthor(data.username)
    .setColor("#0000FF")
    .addField("Wins", wins, true)
    .addField("Kills/Death", kd, true)
    .addField("Kills", kills, true)
    .addField("Score", score, true)
    .addField("Matches Played", mplayed, true)
    .addField("Win Percentage", winper, true);

    message.channel.send(embed);

  });


  //
  // let data = ft.user(username, platform).then(data => {
  //
  //   let stats = data.lifetimeStats;
  //   let kills = stats.find(s => s.stat == 'kills');
  //   let wins = stats.find(s => s.stat == 'wins');
  //   let kd = stats.find(s => s.stat == 'kd');
  //   let mPlayed = stats.find(s => s.stat == 'matchesPlayed');
  //   let tPlayed = stats.find(s => s.stat == 'timePlayed');
  //   let asTime = stats.find(s => s.stat == 'avgSurvivalTime');
  //
  //   let ember = new Discord.RichEmbed()
  //   .setTitle("Fortnite Stats")
  //   .setAuthor(data.username)
  //   .setColor(config.orange)
  //   .addField("Kills", kills.value, true)
  //   .addField("Wins", wins.value, true)
  //   .addField("KD", kd.value, true)
  //   .addField("Matches Played", mPlayed.value, true)
  //   .addField("Time Played", tPlayed.value, true)
  //   .addField("Average Survival Time", asTime.value, true);
  //
  //   message.channel.send(embed);
  //
  //
  //
  // }).catch(e => {
  //   console.log(e);
  //   message.channel.send("Couldn't find that fortnite player! ");
  // });

}

module.exports.help = {
  name: "fort"
}
