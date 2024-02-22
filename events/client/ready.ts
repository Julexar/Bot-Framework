import { Guild, ApplicationCommandDataResolvable, PresenceData } from 'discord.js';
import { client } from '../..';

class Event {
    name: string;
    constructor() {
        this.name = 'ready';
    }

    async run() {
        const commandsArray = Array.from(client.slashCommands).values() as unknown as ApplicationCommandDataResolvable[];

        client.user?.setPresence(client.config.presence as PresenceData);

        client.guilds.cache.forEach(async (guild: Guild) => {
            try {
                await guild.commands.set(commandsArray);

                console.log(`Successfully registered Slash Commands in ${guild.name}`);
            } catch (err) {
                console.error(err);
            }
        });
    }
}

export default new Event();
