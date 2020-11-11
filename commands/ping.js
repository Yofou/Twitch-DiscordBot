const Command = require("../utils/Command");

module.exports = class Ping extends Command {

    constructor() {
        super(
            'ping',
            'ping', 
            'Checks if the bot is responding'
        )
    }

    run(client, message, args) {
        message.reply('🏓')
    }

}