import { client } from '../..';
import { NotFoundError, ForbiddenError } from '../../custom/errors';
import { ErrorEmbed } from '../../custom/embeds';

class slashHandler {
    constructor() {
        this.name = 'interactionCreate';
        this.nick = 'Slash';
    }

    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async run(interaction) {
        try {
            if (interaction.isChatInputCommand()) {
                const command = client.slashCommands.get(interaction.commandName);
                if (!command)
                    throw new NotFoundError(
                        'Command not found',
                        "This Command doesn't exit within the Bot's files, please contact the Developer about this Issue."
                    );

                if (command.permissions) {
                    if (
                        command.permissions.bot &&
                        command.permissions.bot.length &&
                        !interaction.channel.permissionsFor(interaction.guild.me).has(command.permissions.bot)
                    ) {
                        const perms = interaction.channel.permissionsFor(interaction.guild.me).missing(command.permissions.bot);

                        throw new ForbiddenError(
                            'Bot missing Permissions',
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

                if (command.permissions) {
                    if (
                        command.permissions.bot &&
                        command.permissions.bot.length &&
                        !interaction.channel.permissionsFor(interaction.guild.me).has(command.permissions.bot)
                    ) {
                        const perms = interaction.channel.permissionsFor(interaction.guild.me).missing(command.permissions.bot);

                        throw new ForbiddenError(
                            'Bot missing Permissions',
                            'The Bot is missing the Permissions to run the command:\n' + perms.map(p => `\`${p}\``).join(', ')
                        );
                    }
                }

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
