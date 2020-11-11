const { canBeat } = require("./constants")
const { MessageEmbed } = require("discord.js");

module.exports = function( player1, player2, play1, play2 ) {
    const embed = new MessageEmbed()
        .setDescription(`${player1.username} played: ${play1}\n${player2.username} played: ${play2}`)
    
    if ( canBeat[ play1 ] === play2 ) {
        // Player 1 won
        embed
            .setColor( '#00FF00' )
            .setTitle( `${player1.username} won` )
    } else if ( play1 === play2 ) {
        // tie
        embed
        .setColor( '#FFA500' )
        .setTitle( `It's a tie` )
    } else {
        // Player 2 won
        embed
        .setColor( '#FF4500' )
        .setTitle( `${player2.username} won` )
    }

    return embed

}