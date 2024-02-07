import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { config } from '../../config.js';

class DiscordClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates,
            ],
        });

        this.slashCommands = new Collection();
        this.prefixCommands = new Collection();
        this.contextCommands = new Collection();
        this.config = config;
    }

    async start() {
        try {
            const handlers = ['events', 'slashCommands', 'prefixCommands', 'contextCommands'];
            handlers.forEach(async (handler) => {
                const module = await import(`../handlers/${handler}.js`);
                module.default.run();
            });

            this.login(this.config.token);
        } catch (err) {
            this.logDevError(err);
        }
    }
}

export { DiscordClient };