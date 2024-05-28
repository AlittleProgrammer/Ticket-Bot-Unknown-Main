// ./cmd/partner.js
module.exports = {
  name: 'partner',
  description: 'Responds to !partner command',
  execute(message, args) {
    message.reply(
      `***🇮🇹 Leggi i seguenti requisiti e se li rispetti compila il modulo. 
🇺🇸 Read the following requirements and if you meet them, fill out the form.***
      
      #  🇮🇹 REQUISITI PARTNER 

      ## MINIMO 200 MEMBRI 
           
      > - 200-500 MEMBRI <#1229142285078233220> 
      > - 500+ MEMBRI CANALE PRIVATO CON PING
      
      # MODULO PARTNER 
      > - *invito:
      > - membri:
      > - cosa si fa nel discord:*
      
      #  🇺🇸 PARTNER REQUIREMENTS

      ## MINIMUM 200 MEMBERS
           
      > - 200-500 MEMBERS <#1229142285078233220> 
      > - 500+ PRIVATE CHANNEL MEMBERS WITH PING
      
      # MODULO PARTNER 
      > - link:
      > - members:
      > - what is done in the discord:`
    );
  },
};
