const Ascii = require('ascii-table');
const client = require('../..');
const commands = require('../../commands/prefix');

class prefixHandler {
    static run() {
        const prefixCommandsTable = new Ascii('Prefix Commands').setHeading('Name', 'Status', 'Reason');

        for (const command of commands) {
            let name;

            if (!command.name || !command.run) return commandsTable.addRow(command.filename, 'Failed', 'Missing Name/Run');

            name = command.name;

            if (command.nick) name += ` (${command.nick})`;

            if (!command.enabled) return commandsTable.addRow(name, 'Failed', 'Disabled');

            client.prefixCommands.set(command.name, command);
            commandsTable.addRow(name, 'Success');
        }

        console.log(prefixCommandsTable.toString());
    }
}

const handler = prefixHandler;

module.exports = handler;
