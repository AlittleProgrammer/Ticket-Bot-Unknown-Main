const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'sendmessage',
    description: 'Invia il messaggio corrispondente al canale specificato',
    execute(client) {
        // Determina il percorso completo del file JSON dei messaggi
        const messagesFilePath = path.join(__dirname, 'messages.json');

        // Carica il file JSON dei messaggi
        let messagesData;

        try {
            messagesData = JSON.parse(fs.readFileSync(messagesFilePath, 'utf8'));
        } catch (error) {
            console.error('Errore nel caricamento del file JSON dei messaggi:', error);
            return;
        }

        // Trova il messaggio corrispondente all'ID del canale come stringa
        const channelId = client.channelId.toString();
        const message = messagesData.find(msg => msg.channelId === channelId);

        // Verifica se il messaggio è stato trovato
        if (message) {
            // Invia il messaggio nel canale corrente
            const channel = client.channels.cache.get(channelId);
            if (channel) {
                channel.send(message.messageContent)
                    .then(() => console.log(`Messaggio inviato al canale ${channelId}`))
                    .catch(console.error);
            } else {
                console.error(`Canale con ID ${channelId} non trovato`);
            }
        } else {
            // Rispondi nel canale corrente che non c'è nessun messaggio da inviare
            const channel = client.channels.cache.get(channelId);
            if (channel) {
                channel.send('Non c\'è nessun messaggio da mandare in questo canale.')
                    .then(() => console.log(`Nessun messaggio trovato per il canale ${channelId}`))
                    .catch(console.error);
            }
        }
    }
};
