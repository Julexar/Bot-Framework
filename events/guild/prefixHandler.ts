import { Message, TextChannel, Guild, GuildMember } from 'discord.js';
import { client } from '../..';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../custom/errors';
import { ErrorEmbed } from '../../custom/embeds';

class prefixHandler {
    name: string;
    nick: string;
    constructor() {
        this.name = 'messageCreate';
        this.nick = 'Prefix';
    }

    async run(message: Message) {
        try {
            const server = message.guild as Guild;

            const prefix = client.config.default_prefix;

            if (message.content.toLowerCase().startsWith(prefix)) {
                const args = message.content.slice(prefix.length).trim().split(/\s+--/);
                const arg = args.shift() as string;
                const command = arg.toLowerCase();
                const cmd = client.prefixCommands.get(command) || client.prefixCommands.find(c => c.aliases && c.aliases.includes(command));

                if (!cmd)
                    throw new NotFoundError(
                        'Command not found',
                        "This Command doesn't exit within the Bot's files, please contact the Developer about this Issue."
                    );

                const channel = message.channel as TextChannel;

                if (message.member && message.member.user.bot) return;

                if (cmd.permissions) {
                    if (cmd.permissions.member && cmd.permissions.member.length >= 1) {
                        if (message.member && !channel.permissionsFor(message.member).has(cmd.permissions.member)) {
                            const perms = channel.permissionsFor(message.member).missing(cmd.permissions.member);

                            throw new ForbiddenError(
                                'Missing Permission',
                                'You are missing the needed Permissions to run the current Command:\n' + perms.map(p => `\`${p}\``).join(', ')
                            );
                        }
                    } else if (cmd.permissions.bot && cmd.permissions.bot.length >= 1) {
                        if (!channel.permissionsFor(server.me).has(cmd.permissions.bot)) {
                            const perms = channel.permissionsFor(server.me).missing(cmd.permissions.bot);

                            throw new ForbiddenError(
                                'Bot missing Permission',
                                'The Bot is missing the needed Permissions to run the current Command:\n' + perms.map(p => `\`${p}\``).join(', ')
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
                        `The Command doesn't have any arguments. The correct usage is:\n\`${prefix}${cmd.name}\``
                    );
            }
        } catch (err) {
            if (err instanceof NotFoundError || err instanceof ForbiddenError || err instanceof BadRequestError)
                return await message.reply({
                    embeds: [new ErrorEmbed(err, false)],
                });

            return await message.reply({
                embeds: [new ErrorEmbed(err, true)],
            });
        }
    }
}

export default new prefixHandler();
