const Command = require("../utils/Command");
const findUser = require('../utils/findUser');
const getReponse = require('../utils/getResponse');
const response = require("../utils/response.js");
const winnerResponse = require('../utils/response.js')

module.exports = class PVP extends Command {

    constructor() {
        super(
            'pvp',
            'pvp [USER ID/MENTION]',
            'Play Rock, Paper Scissors againt a friend'
        )
    }

    async run( client, message, args ) {
        const [ request ] = args;

        if ( !request ) return message.reply('Please input a valid user request')
        
        const opponent = await findUser( client.users, request )
        if ( !opponent ) return message.reply( `Invalid user of ${request}` )

        const opponentMessage = await opponent.send(`${message.author.username} has sent you a request to play RPS`)
            .catch( err => undefined )
        
        if ( !opponentMessage ) return message.reply(`${opponent.username} has his dm's disabled`)

        await Promise.all( [
            opponentMessage.react( '👍' ),
            opponentMessage.react( '👎' )
        ] )

        const reaction = await opponentMessage
            .awaitReactions( (reaction) => ['👍', '👎'].includes( reaction.emoji.name ), { time: 10000, max: 1 } )

        if ( reaction.first().emoji.name === '👎' ) return message.reply(`${opponent.username} denied your request`)

        const [response1, response2] = await Promise.all([
            getReponse( message.author ),
            getReponse( opponent )
        ])

        if ( !response1 ) return message.channel.send( `${message.author} did not respond` )
        if ( !response2 ) return message.channel.send( `${opponent} did not respond` )
        
        const embed = winnerResponse( message.author, opponent, response1, response2 )
        message.channel.send( embed )
    }

} 