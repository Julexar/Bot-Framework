import fs from 'fs';

const events = [];

const dirs = fs.readdirSync('./events');

for (const dir of dirs) {
    const files = fs.readdirSync(`./events/${dir}`).filter(file => file.endsWith('.js'));

    for (const file of files) {
        const module = await import(`../events/${dir}/${file}`);
        const event = module.event;

        events.push(event);
    }
}

export { events };
