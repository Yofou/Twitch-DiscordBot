
module.exports = async function( manager, input ) {

    if ( input.startsWith('<@') ) input = input.slice(2)
    if ( input.startsWith('!') ) input = input.slice(1)
    if ( input.endsWith('>') ) input = input.slice(0, input.length - 1)

    try {
        return await manager.fetch( input )
    } catch (error) {
        return undefined
    }

}