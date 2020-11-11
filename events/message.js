
module.exports = ( client ) => {

    return ( message ) => {

        if ( message.author.bot || !message.content.startsWith( client.prefix ) ) return

        const args = message.content
            .slice( client.prefix.length )
            .split( ' ' );
        
        const request = args.shift()
        const command = client.commands.get( request )
        
        if ( !command ) return

        command.run( client, message, args )

    }   

}