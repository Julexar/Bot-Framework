import Ascii from 'ascii-table';
import { client } from '../..';
import { commands } from '../../commands/context';

class contextHandler {
    static async run() {
        const commandsTable = new Ascii('Commands').setHeading('Name', 'Status', 'Reason');

        for (const command of commands) {
            let name;

            if (!command.name || !command.run) return commandsTable.addRow(command.filename, 'Failed', 'Missing Name/Run');

            name = command.name;

            if (command.nick) name += ` (${command.nick})`;

            if (!command.enabled) return commandsTable.addRow(name, 'Failed', 'Disabled');

            client.contextCommands.set(command.name, command);
            commandsTable.addRow(name, 'Success');
        }

        console.log(commandsTable.toString());
    }
}

const handler = contextHandler;

export { handler };
