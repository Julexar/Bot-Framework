import { client } from '../..';

class Event {
    constructor() {
        this.name = 'ready';
    }

    async run() {
        const commandsArray = client.slashCommands;

        client.user.setPresence(client.config.presence);

        client.guilds.cache.forEach(guild => {
            guild.commands.set(commandsArray)
            .then(() => {
                console.log(`Successfully registered slash commands in ${guild.name}`);
            })
            .catch((err) => {
                console.error(`Failed to register slash commands in ${guild.name}: ${err}`);
            });
        });
    }
}

export default new Event();