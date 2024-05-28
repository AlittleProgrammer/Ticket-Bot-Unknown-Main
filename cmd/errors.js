// ./cmd/errors.js
module.exports = {
  name: 'errors',
  description: 'Responds to !errors command',
  execute(message, args) {
    message.reply(
      `- make sure antivirus is totally disabled, use defender control

- make sure virtualization is enabled, u can check if from task manager - performance - CPU

- make sure Hyper-v is disabled, disable it via services and via windows features

- make sure vanguard anticheat or Face It are uninstalled and not running, use revo uninstaller to remove

- use the fixer in <#1239725963454185603> and restart your pc

**if u get an error just one time try again, If the problem persists and you can't resolve it, open a ticket**`
    );
  },
};
