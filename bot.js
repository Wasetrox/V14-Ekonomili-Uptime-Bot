// @ts-check

require("dotenv").config();

const { getConfig, checkConfig } = require("./functions/config");
checkConfig();
const { token } = getConfig();
const { client } = require("./client");

require("moment-duration-format");
require("./slash")(client);

process
  .on("uncaughtException", console.error)
  .on("unhandledRejection", console.error);
client.login(token);

const { joinVoiceChannel } = require('@discordjs/voice')
client.on('ready', () => {
  let channel = client.channels.cache.get("1255194964921553012")
 

      const VoiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
  });
})