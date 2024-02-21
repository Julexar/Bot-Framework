import { EmbedBuilder } from 'discord.js';
import { client } from '../..';

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
		const prefix = client.config.default_prefix;

		if (message.content.toLowerCase().startsWith(prefix)) {
			const args = message.content.slice(prefix.length).trim().split(/\s+--/);
			const command = args.shift().toLowerCase();
			const cmd = client.prefixCommands.get(command) || client.prefixCommands.find((c) => c.aliases && c.aliases.includes(command));

			if (!cmd) return;

			if (cmd.permissions) {
				if (cmd.permissions.member && cmd.permissions.member.length >= 1) {
					if (!message.channel.permissionsFor(message.member).has(cmd.permissions.member)) {
						const perms = message.channel.permissionsFor(message.member).missing(cmd.permissions.member);
						return await message.reply({
							embeds: [
								new EmbedBuilder()
									.setColor('Red')
									.setTitle('Error 403: Missing Permission')
									.setDescription('You are missing the needed Permissions to run the current Command:\n' + perms.join(', '))
									.setTimestamp(),
							],
						});
					}
				} else if (cmd.permissions.bot && cmd.permissions.bot.length >= 1) {
					if (!message.channel.permissionsFor(message.guild.me).has(cmd.permissions.bot)) {
						const perms = message.channel.permissionsFor(message.guild.me).missing(cmd.permissions.bot);
						return await message.reply({
							embeds: [
								new EmbedBuilder()
									.setColor('Red')
									.setTitle('Error 403: Bot missing Permission')
									.setDescription('The Bot is missing the needed Permissions to run the current Command:\n' + perms.join(', '))
									.setTimestamp(),
							],
						});
					}
				}
			}

			if (cmd.args) {
				if (!cmd.optional) {
					if (args.length < cmd.usage.length) {
						let usage = '';
						for (const arg of cmd.usage) {
							usage += arg + ' ';
						}
						return await message.reply({
							embeds: [
								new EmbedBuilder()
									.setColor('Red')
									.setTitle('Error 400: Invalid Command')
									.setDescription(
										`The Command requires you to use it\'s arguments. The correct usage is:\n\`${prefix}${cmd.name} ${usage}\``
									)
									.setTimestamp(),
							],
						});
					} else {
						cmd.run(message, args);
						message.delete();
					}
				} else {
					cmd.run(message, args);
					message.delete();
				}
			} else if (!cmd.args) {
				if (args.length > 0) {
					return await message.reply({
						embeds: [
							new EmbedBuilder()
								.setColor('Red')
								.setTitle('Error 400: Invalid Command')
								.setDescription(`This Command does not have any arguments. The correct usage is:\n\`${prefix}${cmd.name}\``)
								.setTimestamp(),
						],
					});
				} else {
					cmd.run(message, args);
					message.delete();
				}
			}
		}
	}
}

export default new prefixHandler();
