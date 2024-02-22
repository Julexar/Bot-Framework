import { CommandInteraction, Guild, TextChannel } from 'discord.js';
import { client } from '../..';
import { ForbiddenError, NotFoundError } from '../../custom/errors';
import { ErrorEmbed } from '../../custom/embeds';

class slashHandler {
    name: string;
    nick: string;
    constructor() {
        this.name = 'interactionCreate';
        this.nick = 'Slash';
    }

    async run(interaction: CommandInteraction) {
        try {
            const server = interaction.guild as Guild;

            if (interaction.isChatInputCommand()) {
                const command = client.slashCommands.get(interaction.commandName);
                if (!command)
                    throw new NotFoundError(
                        'Command not found',
                        "This Command doesn't exit within the Bot's files, please contact the Developer about this Issue."
                    );

                const channel = interaction.channel as TextChannel;

                if (command.permissions) {
                    if (
                        command.permissions.bot &&
                        command.permissions.bot.length &&
                        !channel.permissionsFor(server.me).has(command.permissions.bot)
                    ) {
                        const perms = channel.permissionsFor(server.me).missing(command.permissions.bot);

                        throw new ForbiddenError(
                            'Bot missing Permission',
                            'The Bot is missing the Permissions to run the command:\n' + perms.map(p => `\`${p}\``).join(', ')
                        );
                    }
                }

                await command.run(interaction);
            }

            if (interaction.isContextMenuCommand()) {
                const command = client.contextCommands.get(interaction.commandName);

                if (!command)
                    throw new NotFoundError(
                        'Command not found',
                        "This Command doesn't exit within the Bot's files, please contact the Developer about this Issue."
                    );

                await command.run(interaction);
            }
        } catch (err) {
            if (err instanceof NotFoundError || err instanceof ForbiddenError)
                return await interaction.reply({
                    embeds: [new ErrorEmbed(err, false)],
                    ephemeral: true,
                });

            return await interaction.reply({
                embeds: [new ErrorEmbed(err, true)],
                ephemeral: true,
            });
        }
    }
}

export default new slashHandler();
