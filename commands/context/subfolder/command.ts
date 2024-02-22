import { ApplicationCommandType, ContextMenuCommandInteraction } from 'discord.js';
import { ContextBuilder } from '../../../custom/builders';

class Command extends ContextBuilder {
    enabled: boolean;
    constructor(data: any) {
        super(data);

        this.enabled = true;
    }

    async run(interaction: ContextMenuCommandInteraction) {}
}

export const command = new Command({
    name: 'command',
    description: 'A command',
    type: ApplicationCommandType.User,
    default_member_permissions: [],
    options: [],
});
