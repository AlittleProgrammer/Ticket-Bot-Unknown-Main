const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../config.json');
const Discord = require('discord.js');
const { Modal, TextInputComponent } = require('discord.js');

// messaggio crypto
module.exports = {
  init(client) {
    client.on('messageCreate', (message) => {
      if (message.content === '!crypto') {
        let embed = new MessageEmbed()
          .setTitle('Crypto Payments')
          .setDescription('- 🇮🇹 Clicca il bottone qui sotto per inviare i soldi via criptovaluta\n- 🇺🇸 Click the button below to send the money via cryptocurrency')
          .setColor('#313338');

        let ltcGqnna = new MessageButton()
          .setLabel('LTC Gqnna')
          .setStyle('SECONDARY')
          .setCustomId('LTC Gqnna')
          .setEmoji('<:ggfredoomworld_ltc:1240010865462214798>');

        let row = new MessageActionRow().addComponents(ltcGqnna);
        message.channel.send({ embeds: [embed], components: [row] });
      }
    });

    client.on('interactionCreate', async interaction => {
      if (interaction.customId === 'LTC Gqnna') {
        interaction.reply({ 
          content: `LTC ADDRESS: LW8CqHAyaAHJSdinUGxhRuS2NSYCyxvxyF `, 
          ephemeral: true 
        });
      } 
        });     
    },
  };

