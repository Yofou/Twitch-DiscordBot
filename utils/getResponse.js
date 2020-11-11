
module.exports = async function( player ) {

    const message = await player.send( 'Pick Rock, Paper, Scissor' )
    
    await Promise.all([
        message.react('✂️'),
        message.react('🗻'),
        message.react('🗞️')
    ])

    const response = await message.awaitReactions( ( reaction ) => ['✂️', '🗻', '🗞️'].includes( reaction.emoji.name ), { time: 10000, max: 1 } )
    
    if ( !response || !response.size ) return undefined
    
    return response.first().emoji.name
}