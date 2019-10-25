# COMP 484 - Project
- Erik, Alex, Wayne, Daniel
## Website
- Made with Bootstrap

## Bot
- Discord bot
- Node.js application using discord.js framework.
------------------------------------------------------------------------------
## Get started
1. Download & Install NodeJS (https://nodejs.org/en/)
2. Create account or login with existing. https://discordapp.com/

3. Text editor such as Notepad++, Atom etc.

## Discord Bot - "Ping Pong!"
1. https://discordapp.com/developers/
2. Create Application
3. Fill out name, upload picture and then copy the Client ID and then Save changes.
4. On the left side under settings, click `Bot`.
5. Copy and Save your token somewhere safe.
6. Click `Add Bot` and then `Yes, do it!`.
7. Copy the link below but replace "ENTER_YOUR_BOT_ID_HERE" https://discordapp.com/oauth2/authorize?&client_id=ENTER_YOUR_BOT_CLIENT_ID_HERE&scope=bot&permissions=8

## How to invite
https://discordapp.com/oauth2/authorize?&client_id=521813977492095019&scope=bot&permissions=8

### package.json
1. Create a new folder for your project. Create a new file called `package.json` and paste the following:
```
{
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.16.4",
    "discord.js": "^11.4.2"
  }
}
```
### server.js
```
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }

})

client.login(process.env.BOT_TOKEN)
```

### Add a new command for the bot to use.

if (msg.content.startsWith(`${PREFIX}play`)) {

      <add code to be executed here>

}

## Glitch Hosting
1. Create a new file called `.env` @ glitch.
2. BOT_TOKEN=<insert_token_here>

Wake up Dwight: link here.

## Issues
- Use glitch to handle secret variables (.env)
- Get YouTube modules/API to work properly.
- !skip command not working properly.
- Search function, simple-youtube-api API does not return names.

## Dependencies used:
- express 4.16.4
- discord.js 11.4.2
- node-opus 0.3.1
- ytdl-core 0.28.1
- ffmpeg-bin 0.0.1

