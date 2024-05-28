const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { Modal, TextInputComponent } = require('discord.js');

//messaggio/Embed
module.exports = {
  init(client) {
    client.on('messageCreate', (message) => {
      if (message.content === '!pp' || message.content === '!paypal') {
        let embed = new MessageEmbed()
          .setTitle('PayPal')
          .setDescription('- 🇮🇹 Clicca il bottone qui sotto per inviare i soldi\n- 🇺🇸 Click the button below to send money')
          .setColor('#313338');

        let ppGqnna = new MessageButton()
          .setLabel('PayPal Gqnna')
          .setStyle('PRIMARY')  // Updated to a valid button style
          .setCustomId('paypal_button')  // Custom ID required for non-link buttons
          .setEmoji('<a:PP:1198626190286655518>');

        let row = new MessageActionRow().addComponents(ppGqnna);
        message.channel.send({ embeds: [embed], components: [row] });
      }
    });

    client.on('interactionCreate', async interaction => {
      if (!interaction.isButton()) return;

      if (interaction.customId === 'paypal_button') {
        await interaction.reply({
          content: 'davidamor2002.da@gmail.com\n🇮🇹 Amici e familiari no note o non riceverai il tuo prodotto\n🇬🇧 Friends and family no notes or you will not receive your product',
          ephemeral: true // Rendere il messaggio visibile solo all'utente che ha cliccato il bottone
        });
      }
    });
  }
};
