const client = require('../..');
const { BadRequestError, ForbiddenError, NotFoundError } = require('../../custom/errors');
const { ErrorEmbed } = require('../../custom/embeds');

class prefixHandler {
    constructor() {
        this.name = 'messageCreate';
        this.nick = 'Prefix';
    }

    /**
     *
     * @param {import("discord.js").Message} message
     */
    async run(message) {
        try {
            const prefix = client.config.default_prefix;

            if (message.content.toLowerCase().startsWith(prefix)) {
                const args = message.content.slice(prefix.length).trim().split(/\s+--/);
                const command = args.shift().toLowerCase();
                const cmd = client.prefixCommands.get(command) || client.prefixCommands.find(c => c.aliases && c.aliases.includes(command));

                if (!cmd) return;

                if (cmd.permissions) {
                    if (cmd.permissions.member && cmd.permissions.member.length >= 1) {
                        if (!message.channel.permissionsFor(message.member).has(cmd.permissions.member)) {
                            const perms = message.channel.permissionsFor(message.member).missing(cmd.permissions.member);

                            throw new ForbiddenError(
                                'Missing Permissions',
                                'You are missing the needed Permissions to run this Command: ' + perms.map(p => `\`${p}\``).join(', ')
                            );
                        }
                    } else if (cmd.permissions.bot && cmd.permissions.bot.length >= 1) {
                        if (!message.channel.permissionsFor(message.guild.me).has(cmd.permissions.bot)) {
                            const perms = message.channel.permissionsFor(message.guild.me).missing(cmd.permissions.bot);

                            throw new ForbiddenError(
                                'Bot missing Permissions',
                                'The Bot is missing the needed Permissions to run this Command: ' + perms.map(p => `\`${p}\``).join(', ')
                            );
                        }
                    }
                }

                if (cmd.args) {
                    if (!cmd.optional) {
                        if (args.length < cmd.usage.length) {
                            const usage = cmd.usage.join(' ');

                            throw new BadRequestError(
                                'Invalid Command',
                                `The Command requires you to use it\'s arguments. The correct usage is:\n\`${prefix}${cmd.name} ${usage}\``
                            );
                        }
                    }
                } else if (!cmd.args && args.length > 0)
                    throw new BadRequestError(
                        'Invalid Command',
                        `The Command doesn\'t have any arguments. The correct usage is:\n\`${prefix}${cmd.name}\``
                    );

                await cmd.run(message, args);
                await message.delete();
            }
        } catch (err) {
            if (err instanceof NotFoundError || err instanceof BadRequestError || err instanceof ForbiddenError)
                return await message.reply({
                    embeds: [new ErrorEmbed(err, false)],
                });

            return await message.reply({
                embeds: [new ErrorEmbed(err, true)],
            });
        }
    }
}

module.exports = new prefixHandler();
