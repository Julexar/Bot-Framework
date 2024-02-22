import { SlashBuilder } from '../../../custom/builders';

class Command extends SlashBuilder {
    constructor(data) {
        super(data);

        this.enabled = true;
    }

    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async run(interaction) {}
}

export const command = new Command({
    name: 'command',
    description: 'A command',
    default_member_permission: [],
    options: [],
});
