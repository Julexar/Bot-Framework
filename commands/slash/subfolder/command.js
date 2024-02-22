const { SlashBuilder } = require('../../../custom/builders');

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

module.exports = new Command({
    name: 'command',
    description: 'A command',
    default_member_permissions: [],
    options: [],
});
