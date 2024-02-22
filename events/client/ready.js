import { client } from '../..';

class Event {
    constructor() {
        this.name = 'ready';
    }

    async run() {
        client.user.setPresence(client.config.presence);

        client.guilds.cache.forEach(async guild => {
            try {
                await guild.commands.set(client.slashCommands);

                console.log(`Successfully registered Slash Commands in ${guild.name}`);
            } catch (err) {
                console.error(err);
            }
        });
    }
}

export default new Event();
