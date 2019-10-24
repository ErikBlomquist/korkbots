const Discord = require("discord.js");
var list;
module.exports.run = async (bot, message, args) => {

  Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

list = ["Retail Row", 
       "Craggy Cliffs",
       "Steamy Stacks",
       "Pleasant Park",
       "Frenzy Farm",
       "Dirty Docks",
       "Salty Springs",
       "Sweaty Sands",
       "Holly Hedges",
       "Weeping Woods",
       "Slurpy Swamp",
       "Misty Meadows",
       "Lazy Lake",
       "Stay AFK an pickaxe some noobs"]
       
      message.channel.send(list.random());
}

module.exports.help = {
  name: "drop"
}
