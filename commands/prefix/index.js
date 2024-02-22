const fs = require('fs');

const commands = [];

const dirs = fs.readdirSync('./commands/prefix');

for (const dir of dirs) {
    const files = fs.readdirSync(`./commands/prefix/${dir}`).filter(file => file.endsWith('.js'));

    for (const file of files) {
        const command = require(`./${dir}/${file}`);

        commands.push(command);
    }
}

export { commands };
