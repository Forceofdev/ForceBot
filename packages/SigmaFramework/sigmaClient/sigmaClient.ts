import {Client, ClientOptions, CommandInteraction, Interaction} from 'discord.js'
import InitClient from './functions/initializeClient.js'
import { promisify } from 'util'
import commands from '../cmdsHandler/cache/commandCache.js'

async function ClientConstructorCalled() {
    const print = await globalThis.GetSigmaPackage('sigmaLog', true)
    print('CLIENT', 'Initializing Client Class')
}
async function p(a, b) {
    const print = await globalThis.GetSigmaPackage('sigmaLog', true)
    print(a, b)
}

interface initOptions {
    isDevBuild: boolean
}

class SigmaClient extends Client {
    constructor(options) {
        super(options)
        this.on('interactionCreate', (interaction: Interaction) => {
            if(!interaction.isChatInputCommand()) return
            p('CLIENT_EVENT', interaction) 

            const cmd = commands.get(interaction.commandName)
            p('CACHE_SEARCH', cmd)
            if(cmd) {
                cmd.run(interaction)
            }
            //console.log(interaction)
        })
        ClientConstructorCalled()
    }
    static init(token: string, options: initOptions) {
        const r = InitClient(token, options)
        return r        
    }
    public on(event: any, listener: any): this {
        super.on(event, listener)
        p('CLIENT_EVENT_LISTENER', event)
        p('CLIENT_EVENT_LISTENER', listener)
        return this
    }
}

export default SigmaClient