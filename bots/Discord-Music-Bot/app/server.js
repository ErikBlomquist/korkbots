const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const Discord = require("discord.js");

const client = new Client({ disableEveryone: true });
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();

client.on('warn', console.warn);
client.on('error', console.error);
client.on('disconnect', () => console.log('Disconnecting'));
client.on('reconnecting', () => console.log('Reconnecting'));

// Set Status
client.on("ready", async () => {
  console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
  client.user.setActivity(`!help | ${client.guilds.size} servers`);
});

// On-message
client.on('message', async msg => {
  // Make sure bot only responds to commands with prefix
  if (msg.author.bot) return;
  if(!msg.content.startsWith(PREFIX)) return;
  // split up prefix and link with space.
  const args = msg.content.split(' ');
  const searchString = args.slice(1).join(' ');
  const url = args[1].replace(/<(.+)>/g, '$1');
  const serverQueue = queue.get(msg.guild.id);

    // !play
    if (msg.content.startsWith(`${PREFIX}play`)) {
    // Check which voice channel to join.
    const voiceChannel = msg.member.voiceChannel;
    // If not in voice channel, send msg.
    if (!voiceChannel) return msg.channel.send('Wake up! You need to be in a voice channel to play music.');
    // Get permissions of bot
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    // Check CONNECT permissions
    if (!permissions.has('CONNECT')) {
      return msg.channel.send('Denied, I need proper CONNECT permissions.');
    }
    // Check SPEAK permissions
    if (!permissions.has('SPEAK')) {
      return msg.channel.send('Denied, I need proper SPEAK permissions.');
    }

    try {
      var video = await youtube.getVideo(url);
    } catch (error) {
        try {
            var videos = await youtube.searchVideos(url, 1);
            var video = await youtube.getVideoByID(videos[0].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send('No search result');
        }
    }
      // Declare what to grab from youtube
      const songInfo = await ytdl.getInfo(args[1]);
      console.log(video);

      const song = {
        id: video.id,
        title: video.title,
        url: 'https://www.youtube.com/watch?v=${video.id}'
      }
      // If there's no serverQueue, create one and set proper settings such as volume.
      if (!serverQueue) {
        const queueConstruct = {
         textChannel: msg.channel,
         voiceChannel: voiceChannel,
         connection: null,
         songs: [],
         volume: 5,
         playing: true
        };
        queue.set(msg.guild.id, queueConstruct);
        // Push song into queue
        queueConstruct.songs.push(song);
        // Join voice channel only if there is a server queu.
        try {
          var connection = await voiceChannel.join();
          queueConstruct.connection = connection;
          play(msg.guild, queueConstruct.songs[0]);
        } catch (error) {
          console.error('I could not join the voice channel: ${error}');
          queue.delete(msg.guild.id);
          return msg.channel.send(`I could not join the voice channel: ${error}`);
        }
      } else {
        serverQueue.songs.push(song);
        return msg.channel.send(`**${song.title}** has been added to the queue!`);
      }
  return undefined;
  // SKIP
} else if (msg.content.startsWith(`${PREFIX}skip`)) {
  if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
  if (!serverQueue) return msg.channel.send('Nothing to skip');
  serverQueue.connection.dispatcher.end('Skip command used');
  return undefined;
  // STOP
} else if (msg.content.startsWith(`${PREFIX}stop`)) {
   if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
   if (!serverQueue) return msg.channel.send('Nothing to stop');
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end('Stop command used');
  return undefined;
  // VOLUME
} else if (msg.content.startsWith(`${PREFIX}volume`)) {
   if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
   if (!serverQueue) return msg.channel.send('Nothing playing.');
   if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
   serverQueue.volume = args[1];
   serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
   return msg.channel.send(`I set the volume to **${args[1]}**`);
  // NP
} else if (msg.content.startsWith(`${PREFIX}np`)) {
   if (!serverQueue) return msg.channel.send('Nothing playing.');
  return msg.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
  // Queue
} else if (msg.content.startsWith(`${PREFIX}queue`)) {
   if (!serverQueue) return msg.channel.send('Nothing playing.');
  return msg.channel.send(`
  __**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join(`\n`)}

**Now playing:** ${serverQueue.songs[0].title}
  `);
  // PAUSE
} else if (msg.content.startsWith(`${PREFIX}pause`)) {
  if (serverQueue && serverQueue.playing) {
    serverQueue.playing = false;
    serverQueue.connection.dispatcher.pause();
    return msg.channel.send(`Paused!`);
  }
  return msg.channel.send(`Nothing to play`);
  // RESUME
} else if (msg.content.startsWith(`${PREFIX}resume`)) {
  if (serverQueue && !serverQueue.playing) {
    serverQueue.playing = true;
    serverQueue.connection.dispatcher.resume();
    return msg.channel.send(`Resumed`);
  }
  return msg.channel.send(`Nothing playing`);
} else if (msg.content.startsWith(`${PREFIX}invite`)) {
  msg.channel.send("You can invite me to your server using the following link: https://discordapp.com/oauth2/authorize?&client_id=521813977492095019&scope=bot&permissions=8");
}
// !help
if (msg.content.startsWith(`${PREFIX}help`)) {
  let embedhelp = new Discord.RichEmbed()
  .setTitle("DJ Dwight Commands", true)
  .setColor(0x00AE86)
  .addField("!play"," Play YouTube URL.")
  .addField("!pause"," Pause song.")
  .addField("!resume"," Resume paused song.")
  .addField("!stop"," Stop song.")
  .addField("!help"," List all commands.")
  .addField("!invite"," Get invite link.")
  .addField("!queue"," List songs in queue.")
  .addField("!np"," List Now Playing song.")
  .addField("!skip", "Skip to next song in queue.")
  .addField("!volume", "Change volume.")
  .addField("Website ", "http://www.DJ-Dwight.glitch.me/");
  msg.channel.send(embedhelp);
}

return undefined;
});

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if(!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
    // Play URL
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
          if (reason = 'Stream not generating quickly enough' ) console.log('Song ended');
          console.log(reason);
          serverQueue.songs.shift(); // Move to next song after been played
          play(guild, serverQueue.songs[0]);
        })
        .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Started playing: ${song.title}`); // print out song title
}




client.login(TOKEN);
