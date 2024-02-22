const { DiscordClient } = require('./structures/lib/DiscordClient.js');
const client = new DiscordClient();

client.start();
console.log('Client started');

module.exports = client;
