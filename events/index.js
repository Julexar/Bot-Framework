const fs = require('fs');

const events = [];

const dirs = fs.readdirSync('./events');

for (const dir of dirs) {
    const files = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));

    for (const file of files) {
        const event = require(`../events/${dir}/${file}`);

        events.push(event);
    }
}

module.exports = events;