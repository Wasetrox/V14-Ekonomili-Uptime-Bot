const Discord = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const db = require("croxydb");

module.exports = {
    slash: true,                                
    cooldown: 5,                              

    data: new SlashCommandBuilder()         
    .setName('blackjack')
    .setDescription('Belirli bir miktar coin ile blackjack oyna.')
    .addIntegerOption(option =>
        option.setName('miktar')
            .setDescription('Oynamak istediğin coin miktarı.')
            .setRequired(true)),
  
    async execute(client, interaction) {   
      
        const user = interaction.user;
        const miktar = interaction.options.getInteger('miktar');
        const userCoins = db.fetch(`coins_${user.id}`) || 0;

        if (miktar <= 0) {
            return interaction.reply(":warning: Lütfen pozitif bir miktar girin.");
        }

        if (userCoins < miktar) {
            return interaction.reply(":x: Yeterli coininiz yok.");
        }

        // Blackjack oyunu kodları buraya gelecek

        // Örneğin:
        const kazandinMi = Math.random() < 0.5; // %50 şansla kazanıp kaybetme simülasyonu
        if (kazandinMi) {
            const kazanilanMiktar = miktar * 2;
            db.add(`coins_${user.id}`, kazanilanMiktar);
            return interaction.reply(`:tada: Tebrikler! :moneybag: Kazandınız. ${kazanilanMiktar} coin kazandınız.`);
        } else {
            db.subtract(`coins_${user.id}`, miktar);
            return interaction.reply(`:x: Maalesef! :money_with_wings: Kaybettiniz. ${miktar} coin kaybettiniz.`);
        }   
    }
};
