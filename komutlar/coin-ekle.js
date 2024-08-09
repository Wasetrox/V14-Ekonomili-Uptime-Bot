const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    slash: true,
    testOnly: true, // Bu satırı prodüksiyona geçmeden önce kaldırın
    cooldown: 0, // Cooldown olmadan istenildiği kadar kullanılabilir

    data: new SlashCommandBuilder()
        .setName('coin-ekle')
        .setDescription('Belirtilen kullanıcının coin miktarına belirli bir miktar ekler')
        .addUserOption(option => 
            option.setName('kullanıcı')
                .setDescription('Coin eklemek istediğiniz kullanıcı')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('miktar')
                .setDescription('Eklemek istediğiniz coin miktarı')
                .setRequired(true)),

    async execute(client, interaction) {
        // Sadece belirli bir kullanıcı bu komutu kullanabilir
        if (interaction.user.id !== '1201247309342720042') {
            return interaction.reply('Bu komutu kullanmaya yetkiniz yok.');
        }

        // Kullanıcı ve miktarı seçen
        const user = interaction.options.getUser('kullanıcı');
        const amount = interaction.options.getInteger('miktar');

        // Kullanıcının mevcut coin miktarını al
        let userCoins = db.get(`coins_${user.id}`) || 0;

        // Kullanıcının mevcut coin miktarına eklenen miktarı ekle
        userCoins += amount;

        // Kullanıcının coin miktarını güncelle
        db.set(`coins_${user.id}`, userCoins);

        // Embed oluştur
        const embed = new EmbedBuilder()
            .setColor('#00ff70')
            .setTitle('Coin Ekleme İşlemi Başarılı!')
            .setDescription(`Başarıyla **${user}** kullanıcısının coin miktarına **${amount}** eklediniz. 
            **Yeni Coin Miktarı: ${userCoins}**`)

        interaction.reply({ embeds: [embed] });
    },
};
