const { ContextMenuCommandBuilder } = require('discord.js');

class ContextBuilder extends ContextMenuCommandBuilder {
    constructor(data) {
        super(data);
    }
}

module.exports = ContextBuilder;
