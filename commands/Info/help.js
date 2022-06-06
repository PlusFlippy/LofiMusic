const { Util, MessageEmbed } = require('discord.js');
const { GOOGLE_API_KEY } = require('../../config');
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(GOOGLE_API_KEY);
const Discord = require("discord.js");
const disbut = require('discord-buttons');
const { MessageActionRow, MessageButton } = require("discord-buttons");
const ytdl = require('ytdl-core');
const { prefix, developerID, bot, support } = require("../../config.json");
const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang, pau, on, off, fp} = require("../../emojis.json")
 const ba = bnn;
module.exports = {

        name: 'help',
        description: 'Play command',
        aliases: ["h"],
        category: "music",
        usage: '[song (name | link)]',
        accessableby: "everyone",
        premium: false,
    run: async (client, message, args, ops) => {


const db =require("quick.db");
let color = db.get(`color_${message.author.id}`);
  if(color === null) color = "#EFB9BE";

  const vchelp = new Discord.MessageEmbed()
    .setTitle('LofiMusic • Help')
    .setDescription(
`
Welcome to LofiMusic's help.
Find all the commands available on this panel.
`)
    .addField('<:music:978932582978838538> **Music**', `\`play\`, \`pause\`, \`stop\`, \`song\`, \`resume\`, \`skip\``)
    .addField('<:settings:978931782160351262> **Config**', `\`setprefix\`, \`premium\``)
    .addField('<:info:978931782248448000> **Info**', `\`help\`, \`invite\`, \`uptime\``)
    .setColor(color)
      .setThumbnail('https://images-ext-1.discordapp.net/external/I9ZqKEBG5F4M8ffRNnGU_P-ge_DBR3Jk4bLdqafXJzw/https/cdn.discordapp.com/avatars/900246137397723156/0e03b63d2867266f8c874316a90bdb0f.webp')

     let nb3 = new MessageButton()
    .setLabel(`Premium`)
    .setEmoji(`979290476777701397`)
    .setStyle("url")
     .setURL(`${support}`);
    
     let nb4 = new MessageButton()
    .setLabel(`Invite`)
    .setEmoji(`937180690091487343`)
    .setStyle("url")
     .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);

     let b3 = new MessageButton()
    .setLabel(`Support`)
    .setEmoji(`937063787821953034`)
    .setStyle("url")
     .setURL(`${support}`);
    
     let b4 = new MessageButton()
    .setLabel(`Invite`)
    .setEmoji(`937180690091487343`)
    .setStyle("url")
     .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);

     


        
let rows = new MessageActionRow()
    .addComponents(b3, b4);

    let rowss = new MessageActionRow()
    .addComponents(b3, b4);


let nhh = new MessageActionRow()
    .addComponents(nb3, nb4);



  

        const { channel } = message.member.voice;
        if (!channel) return message.channel.send(vchelp, nhh);

              

                 const MESSAGE = await message.channel.send(vchelp, rows);

    const filter = (button) => button.clicker.user.id !== client.user.id

    const collector = MESSAGE.createButtonCollector(filter, { time: 60000 });

    collector.on('collect', async (b) => {
const { channel } = message.member.voice;
         const embed1 = new MessageEmbed()
                    .setColor(color)
                    .setDescription(`${m} Successfully joined and bound to ${  message.guild.me.voice.channel || message.member.voice.channel}\n${ba}${d} You can enable 24/7 mode by getting premium.`)


                      const embed2 = new MessageEmbed()
                    .setColor(color)
                    .setDescription(`${m} Successfully stoped playing lofi music.\n${ba}${d} You can enable 24/7 mode by getting premium.`)

        if(b.id == "play") {

const songgs = require("../../songg.json")
let songg = songgs.songg[Math.floor((Math.random() * songgs.songg.length))];

          if (!channel) return await b.reply.send('You need to be in voice channel', true); 
         
  

        args = `${songg}`;
        const searchString = args
        const url = args ? args.replace(/<(.+)>/g, '$1') : '';
  
         MESSAGE.edit(vchelp, rowss)
             b.reply.send(embed1, b3);
             
             
  if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();

            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, message, channel, true);
            }
            return message.channel.send(`**Playlist \`${playlist.title}\` has been songgded to the queue!**`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 1);
                    var video = await youtube.getVideoByID(videos[0].id);
                } catch (err) {
                    console.error(err)
                    return message.channel.send(`Sorry ${message.author.username}, I cant find that song`)
                }
            }
            return handleVideo(video, message, channel);
        }
            async function handleVideo(video, message, channel, playlist = false) {
                const serverQueue = ops.queue.get(message.guild.id);
                const songInfo = await ytdl.getInfo(video.id);
                const song = {
                    id: video.id,
                    title: Util.escapeMarkdown(video.title),
                    url: `https://www.youtube.com/watch?v=${video.id}`,
                    thumbnail: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
                    duration: video.duration,
                    time: songInfo.videoDetails.lengthSeconds
                };

                let npmin = Math.floor(song.time / 60);
                let npsec = song.time - npmin * 60
                let np = `${npmin}:${npsec}`.split(' ')

                if (serverQueue) {
                    serverQueue.songs.push(song);


                    if (playlist) return undefined;
                    else {
                        const sembed = new MessageEmbed()
                            .setColor(color)
                            .setTitle(client.user.username, message.author.displayAvatarURL())
                            .setDescription(`${m} Added one more song in queue ${np} minutes \n${d} **Added by:** ${message.member.displayName}`)
                            .setFooter(`Dev: Avalynn#4247`);
                        message.channel.send(sembed)
                    }
                    return undefined;
                }

                const queueConstruct = {
                    textChannel: message.channel,
                    voiceChannel: channel,
                    connection: null,
                    songs: [],
                    volume: 6,
                    playing: true,
                    loop: false,
                };
                ops.queue.set(message.guild.id, queueConstruct);
                queueConstruct.songs.push(song);
                try {
                    const connection = await channel.join();
                   
                    queueConstruct.connection = connection;
                    play(queueConstruct.songs[0]);
                } catch (error) {
                    console.error(`I could not join the voice channel: ${error.message}`);
                    ops.queue.delete(message.guild.id);
                    await channel.leave();
                    return message.channel.send(`I could not join the voice channel: ${error.message}`);
                }
            };
            async function play(song) {
                const queue = ops.queue.get(message.guild.id);
                if (!song) {
                    queue.voiceChannel.leave();
                    ops.queue.delete(message.guild.id);
                    return;
                };

            
                
  const serverQueue = ops.queue.get(message.guild.id);
                let npmin = Math.floor(song.time / 60);
                let npsec = song.time - npmin * 60
                let np = `${npmin}:${npsec}`.split(' ')

  const dispatcher = queue.connection.play(ytdl(song.url, { highWaterMark: 1 << 20, quality: "highestaudio" }))
                    .on('finish', () => {
                        if (queue.loop) {
                            queue.songs.push(queue.songs.shift());
                            return play(queue.songs[0]);
                        }
                        queue.songs.shift();
                        play(queue.songs[0]);
                    })
                    .on('error', error => console.error(error));
                dispatcher.setVolumeLogarithmic(queue.volume / 5);


            };
             
    

   
  
        
        
            
        }  if(b.id == "stop") {
           

  if (!channel) return await b.reply.send('You need to be in voice channel', true);
           if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return await b.reply.send('You have to join my VC', true);
        }

               
  const serverQueue = ops.queue.get(message.guild.id);
if (serverQueue) {
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end()
        message.guild.me.voice.channel.leave();
        } else {
        channel.leave();
        }
        MESSAGE.edit(vchelp, nhh);
            return await b.reply.send(embed2, b4);

      if(serverQueue = null ) {
    return await b.reply.send('There is nothing to stop', true);
      }
        
            
        }


    });

    collector.on('end', async (b) => {
  
        MESSAGE.edit(vchelp, nhh)
    })

      
        


        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('Missing Permission, I dont have connect permission.');
        if (!permissions.has('SPEAK')) return message.channel.send('Missing Permission, I dont have speak permission.');



    }
};
