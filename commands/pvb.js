const Command = require("../utils/Command");
const { canBeat } = require("../utils/constants")
const response = require('../utils/response.js')

const possiblePlays = Object.keys( canBeat )

module.exports = class PVB extends Command {

    constructor() {
        super(
            'pvb',
            'pvb', 
            'Player vs Bot Rock, Paper, Scissors'
        )
    }

    run(client, message, args) {
        
        let [ play ] = args
        if ( !play || !possiblePlays.includes( play.toLowerCase() ) ) return message.reply( 'Please select a valid response (Rock, Paper, Scissor)' )
        play = play.toLowerCase()

        const botResponse = possiblePlays[Math.floor( Math.random() * possiblePlays.length )]

        const embed = response(message.author, client.user, play, botResponse)

        message.channel.send( embed )

    }

}