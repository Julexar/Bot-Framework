const CustomEmbed = require('./custom-embed.js');

class SuccessEmbed extends CustomEmbed {
    constructor(title, description) {
        super(title, description, 0x65fe08);
    }
}

module.exports = SuccessEmbed;
