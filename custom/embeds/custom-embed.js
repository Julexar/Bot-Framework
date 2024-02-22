const { EmbedBuilder } = require('discord.js');

class CustomEmbed extends EmbedBuilder {
    constructor(title, description, color, fields, author) {
        super({
            color: 0x00ffff || color,
            description: description,
            footer: {
                text: 'Made by Julexar',
            },
        });

        this.setTimestamp();

        if (title) this.setTitle(title);

        if (fields) this.setFields(fields);

        if (author) this.setAuthor({ name: author.displayName, iconURL: author.iconURL() });
    }
}

module.exports = CustomEmbed;
