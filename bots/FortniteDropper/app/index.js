const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  //bot.user.setActivity("Fortnite How-to-build tutorials", {type: "WATCHING"});
  bot.user.setActivity(`!helpme !drop ${bot.guilds.size} servers`);
});
       
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  // PREFIX FOR BOT (etc. !stats)
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");

  if(messageArray[2]) {
    messageArray[1] = messageArray[1].concat(" ", messageArray[2]);
    messageArray = messageArray.filter(function(item) {
    return item !== messageArray[2];
    })
  }

  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.login(process.env.TOKEN);