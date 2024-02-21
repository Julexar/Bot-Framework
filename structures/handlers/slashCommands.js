import Ascii from 'ascii-table';
import { client } from '../..';
import { commands } from '../../commands/slash';

class slashHandler {
	static async run() {
		const slashCommandsTable = new Ascii('Slash Commands').setHeading('Name', 'Status', 'Reason');

		for (const command of commands) {
			let name;

			if (!command.name || !command.run)
				return commandsTable.addRow(command.filename, 'Failed', 'Missing Name/Run');

			name = command.name;

			if (command.nick) name += ` (${command.nick})`;

			if (!command.enabled) return commandsTable.addRow(name, 'Failed', 'Disabled');

			client.slashCommands.set(command.name, command);
			commandsTable.addRow(name, 'Success');
		}

		console.log(slashCommandsTable.toString());
	}
}

const handler = slashHandler;

export { handler };
