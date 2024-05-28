// ./cmd/commandlist.js
module.exports = {
    name: 'commandlist',
    description: 'Responds to !commandlist command',
    execute(message, args) {
        message.reply(' \n - List of bot commands:\n - !resethwid\n - !crypto\n - !fixerdownload\n - !download\n - !errors\n - !pp\n - !partner');
    },
  };
  