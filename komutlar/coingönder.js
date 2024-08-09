const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const db = require("croxydb");

module.exports = {
    slash: true,
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('coin-gonder')
        .setDescription('Belirli bir kullanıcıya coin gönder.')
        .addUserOption(option =>
            option.setName('alici')
                .setDescription('Coin göndermek istediğiniz kullanıcı.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('miktar')
                .setDescription('Göndermek istediğiniz coin miktarı.')
                .setRequired(true)),

    async execute(client, interaction) {
        const alici = interaction.options.getUser('alici');
        const miktar = interaction.options.getInteger('miktar');

        // Gönderen kullanıcının coin miktarını kontrol et
        const gonderenCoin = db.get(`coins_${interaction.user.id}`) || 0;
        if (gonderenCoin < miktar || miktar <= 0) {
            return interaction.reply({ content: 'Yetersiz coin miktarı veya geçersiz miktar girdiniz.', ephemeral: true });
        }

        // Gönderen kullanıcının coin miktarını azalt
        db.subtract(`coins_${interaction.user.id}`, miktar);

        // Alıcı kullanıcının coin miktarını artır
        db.add(`coins_${alici.id}`, miktar);

        // Embed oluştur
        const embed = new EmbedBuilder()
            .setColor('#7289DA')
            .setTitle('İŞLEM BAŞARILI!')
            .setDescription(`**${interaction.user.toString()}** adlı kullanıcı, **${alici.toString()}** adlı kullanıcıya **${miktar}** coin gönderdi.`)
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

        // Cevabı gönderme
        interaction.reply({ embeds: [embed], ephemeral: false });
    },
};
