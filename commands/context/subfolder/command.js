const { ApplicationCommandType } = require('discord.js');
const { ContextBuilder } = require('../../../custom/builders');

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

module.exports = new Command({
    name: 'command',
    description: 'A command',
    type: ApplicationCommandType.User,
    default_member_permissions: [],
    options: [],
});
