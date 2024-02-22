const CustomEmbed = require('./custom-embed.js');

class ErrorEmbed extends CustomEmbed {
    constructor(error, custom) {
        if (custom) super('An Error occurred...', error, 0xff0000);
        else super(`${error}`, `${error.cause}`, 0xff0000);
    }
}

module.exports = ErrorEmbed;
