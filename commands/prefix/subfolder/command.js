class Command {
    constructor() {
        this.name = 'command';
        this.description = 'A command';
        this.permissions = {
            member: [],
        };
        this.enabled = true;
        this.args = true;
        this.usage = ['--arg1'];
    }

    /**
     *
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     */
    async run(message, args) {}
}

module.exports = new Command();
