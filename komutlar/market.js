const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require("croxydb");

module.exports = {
    slash: true,
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('market')
        .setDescription('Link ekleme hakkı satın alabileceğiniz ürünler.')
        .setDefaultPermission(true),

    async execute(client,interaction) {
        const LinkLimit = db.get(`LinkLimit_${interaction.user.id}`) || 0;

        const embed = new EmbedBuilder()
            .setColor("#7289DA")
            .setTitle("Link Ekleme Hakkı Satın Alma Menüsü")
            .setDescription(`Coin cinsinden ürünleri satın alarak link ekleme hakkı elde edebilirsiniz.`)
            .addFields(
                { name: '1 Adet Link', value: '25 Coin', inline: true },
                { name: '2 Adet Link', value: '45 Coin', inline: true },
                { name: '4 Adet Link', value: '80 Coin', inline: true },
                { name: '10 Adet Link', value: '200 Coin', inline: true }
            );

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('urun1')
                    .setLabel('Ürün 1')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('urun2')
                    .setLabel('Ürün 2')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('urun3')
                    .setLabel('Ürün 3')
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId('urun4')
                    .setLabel('Ürün 4')
                    .setStyle(ButtonStyle.Primary)
            );
        
            //console.log(interaction)
            await interaction.reply({ embeds: [embed], components: [row] });

        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            await i.deferUpdate(); // Butona yanıt ver
        
            // Coin miktarını kontrol et
            const coins = db.get(`coins_${interaction.user.id}`);
            if (!coins || coins < 0) {
                return i.followUp('Coin miktarınız bulunamadı veya geçersiz.');
            }
            if (i.customId === 'urun1') {
                if (db.get(`coins_${interaction.user.id}`) < 25) {
                    return i.followUp('Yetersiz coin miktarı!');
                } else {
                    db.subtract(`coins_${interaction.user.id}`, 25);
                    db.add(`LinkLimit_${interaction.user.id}`, 1);
                    i.followUp('1 Adet Link ekleme hakkı satın aldınız.');
                }
            } else if (i.customId === 'urun2') {
                if (db.get(`coins_${interaction.user.id}`) < 45) {
                    return i.followUp('Yetersiz coin miktarı!');
                } else {
                    db.subtract(`coins_${interaction.user.id}`, 45);
                    db.add(`LinkLimit_${interaction.user.id}`, 2);
                    i.followUp('2 Adet Link ekleme hakkı satın aldınız.');
                }
            } else if (i.customId === 'urun3') {
                if (db.get(`coins_${interaction.user.id}`) < 80) {
                    return i.followUp('Yetersiz coin miktarı!');
                } else {
                    db.subtract(`coins_${interaction.user.id}`, 80);
                    db.add(`LinkLimit_${interaction.user.id}`, 4);
                    i.followUp('4 Adet Link ekleme hakkı satın aldınız.');
                }
            } else if (i.customId === 'urun4') {
                if (db.get(`coins_${interaction.user.id}`) < 200) {
                    return i.followUp('Yetersiz coin miktarı!');
                } else {
                    db.subtract(`coins_${interaction.user.id}`, 200);
                    db.add(`LinkLimit_${interaction.user.id}`, 10);
                    i.followUp('10 Adet Link ekleme hakkı satın aldınız.');
                }
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.followUp('Zaman aşımına uğradınız. Lütfen tekrar deneyin.');
            }
        });
    }
};
