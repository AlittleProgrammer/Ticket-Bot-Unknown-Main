const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton , MessageAttachment } = require('discord.js');
const fs = require('fs');
const moment = require('moment-timezone');

// Inizializzazione del client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });


moment.tz.setDefault('Europe/Rome');

const config = require('./config.json');
const pp = require('./cmd/pp');
const crypto = require('./cmd/crypto');

// Inizializzazione del collegamento PayPal
pp.init(client);

// Inizializzazione del collegamento crypto
crypto.init(client);

// Inizializzazione dei comandi
client.commands = new Map();
const commandFiles = fs.readdirSync('./cmd').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./cmd/${file}`);
    client.commands.set(command.name, command);
}

// Prefix per i comandi
const prefix = '!';

// Gestione dei messaggi
client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        if (commandName === 'sendmessage') {
            // Imposta il channelId nel client per l'uso in sendmessage.js
            client.channelId = message.channel.id;
            // Esegui il comando 'sendmessage'
            command.execute(client);
        } else {
            command.execute(message, args);
        }
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
    }
});

//console
client.once('ready', () => {
  console.log('\n\n🟢・BOT ONLINE\n\n');
  client.user.setActivity(`👀 Unknown Service Slots... 👀`, { type: 'WATCHING' });
});

// welcome 
client.on('guildMemberAdd', async (guildMember) => {
  try {
    const logChannelId = '1116788159964000401';
    const roleIdToAdd1 = '1116788453028417547';

    const logChannel = client.channels.cache.get(logChannelId);

    if (!logChannel) {
      console.log('Il canale di log non è stato trovato.');
      return;
    }

    const embed = new MessageEmbed()
      .setDescription(`${guildMember.user}\n> - 🇮🇹 **Benvenuto su Unknown Service**\n> - 🇺🇸 **Welcome to Unknown Service**`)
      .setThumbnail('https://cdn.discordapp.com/attachments/1116788174300135424/1227296156044759120/logo.png?ex=664981dd&is=6648305d&hm=d7f0c1455fdd8a858b8863bdb1d2f65dcc02821fca9a757a46c5cefeafe0e114&')
      .setColor('#ffffff');

    await logChannel.send({ embeds: [embed] });

    const roleToAdd1 = guildMember.guild.roles.cache.get(roleIdToAdd1);

    if (roleToAdd1) {
      await guildMember.roles.add(roleToAdd1);
      console.log(`Ruolo aggiunto con successo a ${guildMember.user.tag}`);
    } else {
      console.log('Il ruolo non esiste.');
    }
  } catch (error) {
    console.error("Si è verificato un errore durante l'aggiunta del ruolo:", error);
  }
});

//verifica
client.on('messageCreate', async message => {
  if (message.content === '!verifica') {
    const button = new MessageButton()
      .setLabel('Verificati')
      .setStyle('SECONDARY')
      .setCustomId('verifica')
      .setEmoji('1220813282357547179');
    const embed = new MessageEmbed()
      .setColor('#ffffff')
      .setTitle("Unknown Service")
      .setDescription("## System Verification \r \r <:ggfredoomworld_Aviso:1084098860743397447> *Welcome to our verification system. To verify your account on the server and have access to all rooms, click the reaction button below.* \r \r <:ggfredoomworld_eternal:1084101060047679498> *Your verification helps us enormously to maintain a safe and secure environment. We sincerely appreciate your cooperation in using our verification process. Thank you.* \r \r <:ggfredoomworld_securitywhite:1111331796525789275> *Unknown Service Team*")
      .setImage("https://media.discordapp.net/attachments/1116788174300135424/1227295503167918080/standard.gif?ex=66443b42&is=6642e9c2&hm=a97050b52e2fde8892008909e500873f06ea1c657048cb569bb476f773676713&=")
      .setFooter("💻 · Developed By domyy.exe");
    const row = new MessageActionRow()
      .addComponents(button);
    message.channel.send({ embeds: [embed], components: [row] });
  }
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton() && interaction.customId === 'verifica') {
    try {
      await interaction.member.roles.add('1116788156021346456'); // Adding Verified Role
      await interaction.member.roles.add('1239972193761235084'); // Separatore
      await interaction.member.roles.remove('1116788453028417547'); // Removing Unverified Role

      // Combine all messages into one
      const replyContent = `${interaction.member.toString()}, hai ottenuto il <@&1116788156021346456> con successo.\n`
      await interaction.reply({ content: replyContent, ephemeral: true });
    } catch (error) {
      console.error('Error adding/removing roles:', error);
      await interaction.reply({ content: 'Si è verificato un errore durante l\'assegnazione dei ruoli.', ephemeral: true });
    }
  }
});


// ticket
client.on('messageCreate', async (message) => {
  if (message.content == '!ticket') {
    if (message.channel.id == '1103421802224558130') {
      message.delete();
      let embed = new MessageEmbed()
        .setTitle('Ticket System')
        .setDescription('- 🇮🇹 Per aprire ticket cliccate su uno dei bottoni qui sotto\n- 🇺🇸 To open tickets click on one of the buttons below')
        .setColor(config.coloreEmbed)
        .setThumbnail('https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320')
        .setFooter('Unknown Service - Ticket', 'https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320');

      const row1 = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel('・Ch3at')
          .setStyle('SECONDARY')
          .setEmoji('<:unklogo:1194771357997740063>')
          .setCustomId(`Ch3at`),

        new MessageButton()
          .setLabel('・Account')
          .setStyle('SECONDARY')
          .setEmoji('<:unklogo:1194771357997740063>')
          .setCustomId(`Account`),

        new MessageButton()
          .setLabel('・Partner')
          .setStyle('SECONDARY')
          .setEmoji('<:unklogo:1194771357997740063>')
          .setCustomId(`Partner`),

          new MessageButton()
          .setLabel('・Other')
          .setStyle('SECONDARY')
          .setEmoji('<:unklogo:1194771357997740063>')
          .setCustomId(`Other`),
      );
      message.channel.send({ embeds: [embed], components: [row1] });
    }
  }
});



//Ch3at
client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === 'Ch3at') {
    try {
      const channelName = `💸・${interaction.user.username}`;

      const channel = await interaction.guild.channels.create(channelName, {
        type: 'text',
        topic: `Member ID・${interaction.user.id}`,
        parent: config.idCategorie.Ch3at,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL']
          },
          {
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.ceo,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.coCeo,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.administrator,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.staff,
            allow: ['VIEW_CHANNEL']
          }
        ]
      });

      channel.setTopic(`${interaction.user.id}`);
      interaction.reply({ content: `Ticket creato: ${channel.toString()}`, ephemeral: true });

      const embed = new MessageEmbed()
        .setAuthor('Unknown Service Ticket', 'https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320')
        .setTitle('Ticket Ch3at')
        .setDescription(`<@${interaction.user.id}>\n🇮🇹 ***Grazie per aver aperto un ticket, dicci di cosa hai bisogno\n🇺🇸 Thank you for opening a ticket, tell us what you need***\n *!pp\n !crypto*`)
        .setColor('#313338')
        .setFooter('Unknown Service - Ticket', 'https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320');

      const TicketClose = new MessageButton()
        .setLabel('| Close')
        .setStyle('SECONDARY')
        .setEmoji('❌')
        .setCustomId(`conferma,${interaction.member.id}`);

      const row = new MessageActionRow().addComponents(TicketClose);
      await channel.send({ embeds: [embed], components: [row] });
      
      const staffNotification = await channel.send(`<@!${interaction.user.id}> | <@&${config.idRuoli.staff}>`);
      setTimeout(() => {
        if (staffNotification.deletable) {
          staffNotification.delete().catch(error => console.error("Error deleting message:", error));
        }
      }, 3000);
    } catch (error) {
      console.error("Error creating ticket channel:", error);
    }
  }
});

//Account
client.on('interactionCreate', async (interaction) => {
  try {
    if (interaction.isButton() && interaction.customId === 'Account') {
      const channelName = `💻・${interaction.user.username}`;

      const channel = await interaction.guild.channels.create(channelName, {
        type: 'text',
        topic: `Member ID・${interaction.user.id}`,
        parent: config.idCategorie.Account,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL']
          },
          {
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.ceo,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.coCeo,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.administrator,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.staff,
            allow: ['VIEW_CHANNEL']
          }
        ]
      });

      channel.setTopic(`${interaction.user.id}`);
      await interaction.reply({ content: `Ticket creato: ${channel.toString()}`, ephemeral: true });

      const embed = new MessageEmbed()
        .setAuthor({ name: 'Unknown Service Ticket', iconURL: 'https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320' })
        .setTitle('Ticket Account')
        .setDescription(`<@${interaction.user.id}>\n🇮🇹 ***Grazie per aver aperto un ticket, attendi che il nostro staff risponda, usa "!commandlist" per vedere vari comandi utili \n🇺🇸 Thank you for opening a ticket, wait for our staff to respond, use "!commandlist" to see various useful commands***`)
        .setColor('#313338')
        .setFooter({ text: 'Unknown Service - Ticket', iconURL: 'https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320' });

      const TicketClose = new MessageButton()
        .setLabel('| Close')
        .setStyle('SECONDARY')
        .setEmoji('❌')
        .setCustomId(`conferma,${interaction.member.id}`);

      const row = new MessageActionRow().addComponents(TicketClose);
      await channel.send({ embeds: [embed], components: [row] });

      const staffNotification = await channel.send(`<@!${interaction.user.id}> | <@&${config.idRuoli.staff}>`);
      setTimeout(() => {
        if (staffNotification.deletable) {
          staffNotification.delete().catch(error => console.error("Error deleting message:", error));
        }
      }, 3000);
    }
  } catch (error) {
    console.error("Error creating ticket channel:", error);
  }
});

client.on('interactionCreate', async (interaction) => {
  try {
    if (interaction.isButton() && interaction.customId === 'Other') {
      const channelName = `💻・${interaction.user.username}`;

      const channel = await interaction.guild.channels.create(channelName, {
        type: 'text',
        topic: `Member ID・${interaction.user.id}`,
        parent: config.idCategorie.Other,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL']
          },
          {
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.ceo,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.coCeo,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.administrator,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.staff,
            allow: ['VIEW_CHANNEL']
          }
        ]
      });

      channel.setTopic(`${interaction.user.id}`);
      await interaction.reply({ content: `Ticket creato: ${channel.toString()}`, ephemeral: true });

      const embed = new MessageEmbed()
        .setAuthor({ name: 'Unknown Service Ticket', iconURL: 'https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320' })
        .setTitle('Ticket Account')
        .setDescription(`<@${interaction.user.id}>\n🇮🇹 ***Grazie per aver aperto un ticket, attendi che il nostro staff risponda\n🇺🇸 Thank you for opening a ticket, wait for our staff to respond***`)
        .setColor('#313338')
        .setFooter({ text: 'Unknown Service - Ticket', iconURL: 'https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320' });

      const TicketClose = new MessageButton()
        .setLabel('| Close')
        .setStyle('SECONDARY')
        .setEmoji('❌')
        .setCustomId(`conferma,${interaction.member.id}`);

      const row = new MessageActionRow().addComponents(TicketClose);
      await channel.send({ embeds: [embed], components: [row] });

      const staffNotification = await channel.send(`<@!${interaction.user.id}> | <@&${config.idRuoli.staff}>`);
      setTimeout(() => {
        if (staffNotification.deletable) {
          staffNotification.delete().catch(error => console.error("Error deleting message:", error));
        }
      }, 3000);
    }
  } catch (error) {
    console.error("Error creating ticket channel:", error);
  }
});



//partner
client.on('interactionCreate', async (interaction) => {
  try {
    if (interaction.customId === 'Partner') {
      const channelName = `🤝・${interaction.user.username}`;

      const channel = await interaction.guild.channels.create(channelName, {
        type: 'text',
        topic: `Member ID・${interaction.user.id}`,
        parent: config.idCategorie.Partner,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: ['VIEW_CHANNEL']
          },
          {
            id: interaction.user.id,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.ceo,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.coCeo,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.administrator,
            allow: ['VIEW_CHANNEL']
          },
          {
            id: config.idRuoli.staff,
            allow: ['VIEW_CHANNEL']
          }
        ]
      });

      channel.setTopic(`${interaction.user.id}`);
      await interaction.reply({ content: `Ticket creato: ${channel.toString()}`, ephemeral: true });

      const embed = new MessageEmbed()
        .setAuthor('Unknown Service Ticket', 'https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320')
        .setTitle('Ticket Partner')
        .setDescription(`<@${interaction.user.id}>\n🇮🇹 ***Grazie per aver aperto un ticket, per maggiori informazioni usa "!partner"\n🇺🇸 Thank you for opening a ticket, for more info use "!partner"***`)
        .setColor('#313338')
        .setFooter('Unknown Service - Ticket', 'https://discord.com/channels/1241065821200060578/1241065821984264322/1241755352718901320');

      const TicketClose = new MessageButton()
        .setLabel('| Close')
        .setStyle('SECONDARY')
        .setEmoji('❌')
        .setCustomId(`conferma,${interaction.member.id}`);

      const row = new MessageActionRow().addComponents(TicketClose);
      await channel.send({ embeds: [embed], components: [row] });
      
      const staffNotification = await channel.send(`<@!${interaction.user.id}> | <@&${config.idRuoli.staff}>`);
      setTimeout(() => staffNotification.delete().catch(error => console.error("Errore durante l'eliminazione della notifica del personale:", error)), 3000);
    }
  } catch (error) {
    console.error("Errore durante la creazione del canale del ticket:", error);
  }
});

client.on('interactionCreate', async (interaction) => {
  try {
    const { channel } = interaction;

    if (!channel) {
      console.error('Channel not found in interaction.');
      return;
    }

    if (interaction.customId.startsWith('conferma')) {
      const memberId = channel.topic;

      if (!memberId) {
        console.error('Channel topic is not set.');
        return;
      }

      const member = interaction.guild.members.cache.get(memberId);

      if (!member) {
        console.error(`Member with ID ${memberId} not found in guild.`);
        return;
      }

      const closedEmbed = new MessageEmbed()
        .setTitle('Ticket Chiuso | Ticket Closed')
        .setColor('#FF0000')
        .setDescription(`- 🇮🇹 Il tuo ticket è stato chiuso da: <@${interaction.user.id}>\n- 🇺🇸 Your ticket has been closed by: <@${interaction.user.id}>`);

      try {
        await member.send({ embeds: [closedEmbed] });
      } catch (error) {
        console.error(`Impossibile inviare un messaggio privato all'utente: ${error}`);
      }

      try {
        await interaction.channel.delete();
      } catch (error) {
        console.error(`Impossibile eliminare il canale: ${error}`);
      }
    } else if (interaction.customId.startsWith('annulla')) {
      if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
        return interaction.reply({ content: 'Non hai i permessi per chiudere il ticket.', ephemeral: true });
      }

      try {
        await interaction.message.delete();
      } catch (error) {
        console.error(`Impossibile eliminare il messaggio: ${error}`);
      }
    }
  } catch (error) {
    console.error('Error handling interaction:', error);
  }
});

const transcriptHandler = async () => {
  if (!bot.tsconfig.sendTranscripts.enableChannel && !bot.tsconfig.sendTranscripts.enableDM) return false

  const APIEvents = require("../api/modules/events")
  const messages = await getmessages(channel,5000)
  await require("../transcriptSystem/manager")(messages,guild,channel,user,reason)
  APIEvents.onTranscriptCreation(messages,channel,guild,new Date())
}
async function handleMode(mode) {
  if (mode === "delete" || mode === "deletenotranscript") {
    await transcriptHandler(); // Utilizzare l'operatore await solo all'interno di funzioni asincrone
  }
  deleteHandler();
}

async function handleMode(mode) {
  if (mode === "delete" || mode === "deletenotranscript") {
    await transcriptHandler();
  }
  deleteHandler();
}


client.on("messageCreate", async message => {
  if (message.content === "!transcript") {
      // ID del canale di destinazione
      const targetChannelId = '1120878613961658459';
      const targetChannel = client.channels.cache.get(targetChannelId);
      if (!targetChannel || !targetChannel.isText()) {
          return message.reply('Il canale di destinazione non è valido.');
      }

      // Controllo se il comando viene eseguito nel canale del ticket
      if (isTicketChannel(message.channel)) {
          console.log('Richiesta di transcript ricevuta in un ticket.');

          let chatLog = `-- CHAT LOG #${message.channel.name} --\n\n`;

          try {
              let messages = await getAllMessages(message.channel);
              messages.reverse().forEach(msg => {
                  chatLog += `@${msg.author.tag} ID: ${msg.author.id} - ${msg.createdAt.toLocaleString()}\n`;

                  if (msg.content) chatLog += `${msg.content}\n`;

                  if (msg.embeds.length > 0) {
                      msg.embeds.forEach(embed => {
                          chatLog += `Embed:\n`;
                          if (embed.title) chatLog += `Title: ${embed.title}\n`;
                          if (embed.description) chatLog += `Description: ${embed.description}\n`;
                          if (embed.fields.length > 0) chatLog += `Fields: ${embed.fields.map(x => `${x.name}-${x.value}`).join(", ")}\n`;
                      });
                  }

                  if (msg.attachments.size > 0)
                      chatLog += `Files: ${msg.attachments.map(x => `${x.name} (${x.url})`).join(", ")}\n`;

                  if (msg.stickers.size > 0)
                      chatLog += `Stickers: ${msg.stickers.map(x => `${x.name} (${x.url})`).join(", ")}\n`;

                  chatLog += "\n";
              });

              let attachment = new MessageAttachment(Buffer.from(chatLog, "utf-8"), `chatLog-channel-${message.channel.id}.txt`);

              let embed = new MessageEmbed()
                  .setTitle("Transcript del ticket")
                  .setDescription("Ecco il log di tutti i messaggi in questo ticket");

              // Invia il messaggio e l'allegato al canale specifico
              targetChannel.send({ embeds: [embed], files: [attachment] })
                  .then(() => {
                      console.log('Transcript inviato con successo al canale.');
                      message.reply("Il transcript è stato inviato al canale specificato.");
                  })
                  .catch(error => {
                      console.error('Si è verificato un errore durante l\'invio del transcript al canale:', error);
                      message.reply("Si è verificato un errore durante l'invio del transcript al canale.");
                  });
          } catch (error) {
              console.error('Si è verificato un errore durante il recupero dei messaggi:', error);
              message.reply("Si è verificato un errore durante il recupero dei messaggi.");
          }
      } else {
          message.reply("Questo comando può essere eseguito solo nei canali dei ticket.");
      }
  }
});

// Funzione per verificare se un canale è un ticket
function isTicketChannel(channel) {
  // Controlla se il nome del canale inizia con uno dei prefissi dei ticket
  const ticketPrefixes = ['🤝', '💻', '💸'];
  return ticketPrefixes.some(prefix => channel.name.startsWith(prefix));
}

const getAllMessages = async (channel) => {
  let allMessages = [];
  let lastMessage;

  while (true) {
      const options = { limit: 100 };
      if (lastMessage) options.before = lastMessage;

      let messages = await channel.messages.fetch(options);

      allMessages = allMessages.concat(Array.from(messages.values()));

      lastMessage = messages.last()?.id;

      if (messages.size !== 100) {
          break;
      }
  }

  return allMessages;
}




// boost message
client.on('guildMemberUpdate', (oldMember, newMember) => {
  const oldBoost = oldMember.premiumSince;
  const newBoost = newMember.premiumSince;

  if (!oldBoost && newBoost) {
    const channel = newMember.guild.channels.cache.get('1208060979490062377');
    if (channel) {
      channel.send({ content: `${newMember} ha appena potenziato il server! 🚀` });
    } else {
      console.error(`Impossibile trovare il canale con ID 1208060979490062377`);
    }
  }
});

// login

client.login(config.token);
