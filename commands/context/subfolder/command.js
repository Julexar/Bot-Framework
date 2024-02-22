import { ApplicationCommandType } from 'discord.js';
import { ContextBuilder } from '../../../custom/builders';

class Command extends ContextBuilder {
    constructor(data) {
        super(data);

        this.enabled = true;
    }

    /**
     *
     * @param {import("discord.js").ContextMenuCommandInteraction} interaction
     */
    async run(interaction) {}
}

export const command = new Command({
    name: 'command',
    description: 'A command',
    type: ApplicationCommandType.User,
    default_member_permissions: [],
    options: [],
});
