import { CommandInteraction } from 'discord.js';
import { SlashBuilder } from '../../../custom/builders';

class Command extends SlashBuilder {
    enabled: boolean;
    constructor(data: any) {
        super(data);

        this.enabled = true;
    }

    async run(interaction: CommandInteraction) {}
}

export const command = new Command({
    name: 'command',
    description: 'A command',
    default_member_permissions: [],
    options: [],
});
