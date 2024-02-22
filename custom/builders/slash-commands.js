const { SlashCommandBuilder } = require('discord.js');

class SlashBuilder extends SlashCommandBuilder {
    constructor(data) {
        super(data);
    }
}

module.exports = SlashBuilder;
