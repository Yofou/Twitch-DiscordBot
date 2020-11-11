const { Client, Collection } = require('discord.js')
const glob = require('glob')
const { parse } = require('path')

const client = new Client()
client.config = require('./config.json')
client.prefix = '!'

client.commands = new Collection()
glob('./commands/*.js', (_, files) => {
    
    files.forEach( file => {

        const cmd = require( file )
        const command = new cmd()

        client.commands.set( command.name, command )

    } )

    console.log( client.commands );

})

glob('./events/*.js', (_, files) => {
    
    files.forEach( file => {

        const event = require( file )
        const { name } = parse( file )
        
        client.on(name, event( client ))

    } )

})

client.login( client.config.token )