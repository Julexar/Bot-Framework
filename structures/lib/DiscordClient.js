const { Client, Collection, GatewayIntentBits } = require('discord.js');

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
        this.config = require('../../config.js');
    }

    start() {
        try {
            ['events', 'slashCommands', 'prefixCommands', 'contextCommands'].forEach(handler => {
                const Handler = require(`../handlers/${handler}.js`);
                Handler.run();
            });

            this.login(this.config.token);
        } catch (err) {
            console.error(err);
        }
    }
}

export { DiscordClient };
