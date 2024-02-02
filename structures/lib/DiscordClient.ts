import { Client, Collection, GatewayIntentBits } from "discord.js";
import { config } from "../../config.ts";

class DiscordClient extends Client {
    slashCommands: Collection<string, any>;
    prefixCommands: Collection<string, any>;
    contextCommands: Collection<string, any>;
    config: { token: string | undefined; default_prefix: string; owners: string[]; presence: { activities: { name: string; type: number; }[]; status: string; }; };

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates
            ],
        });

        this.slashCommands = new Collection();
        this.prefixCommands = new Collection();
        this.contextCommands = new Collection();
        this.config = config;
    }

    async start() {
        try {
            ['events', 'slashCommands', 'prefixCommands', 'contextCommands'].forEach(async handler => {
                const module = await import(`../handlers/${handler}.ts`);
                await module.handler.run();
            });

            this.login(this.config.token);
        } catch (err) {
            console.error(err);
        }
    }
}

export { DiscordClient };