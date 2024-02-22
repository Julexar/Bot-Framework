import { Message } from 'discord.js';

class Command {
    name: string;
    description: string;
    aliases: string[];
    args: boolean;
    usage: string[];
    enabled: boolean;
    constructor() {
        this.name = 'command';
        this.description = 'A command';
        this.aliases = ['cmd'];
        this.args = true;
        this.usage = ['--arg1'];
        this.enabled = true;
    }

    async run(message: Message, args: string[] | undefined) {}
}

export const command = new Command();
