const fs = require('fs');

const commands = [];

const dirs = fs.readdirSync('./commands/slash');

for (const dir of dirs) {
    const files = fs.readdirSync(`./commands/slash/${dir}`).filter(file => file.endsWith('.js'));

    for (const file of files) {
        const command = require(`./${dir}/${file}`);

        commands.push(command);
    }
}

module.exports = commands;
