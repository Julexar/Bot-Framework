const CustomEmbed = require('./custom-embed.js');

class ListEmbed extends CustomEmbed {
    constructor(title, description, fields) {
        super(title, description, 0x00ffff, fields);
    }
}

module.exports = ListEmbed;
