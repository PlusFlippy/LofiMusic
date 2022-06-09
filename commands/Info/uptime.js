const moment = require('moment');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "uptime",
  aliases: [],
  description: "Information",

  run: async (client, message, args) => {
    const a = moment.duration(client.uptime);
      const days = (a.days() == 1) ? `${a.days()} day` : `${a.days()} days`;
      const hours = (a.hours() == 1) ? `${a.hours()} hour` : `${a.hours()} hours`;
      const minutes = (a.minutes() == 1) ? `${a.minutes()} minute` : `${a.minutes()} minutes`;
      const seconds = (a.seconds() == 1) ? `${a.seconds()} second` : `${a.seconds()} seconds`;
      const uptime = `\`\`\`nim\nUptime  :: ${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``
      message.channel.send(uptime);
  }
};