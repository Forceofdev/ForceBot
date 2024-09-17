import {Client, ClientOptions, CommandInteraction, Interaction} from 'discord.js'
import InitClient from './functions/initializeClient.js'
import { promisify } from 'util'
import commands from '../cmdsHandler/cache/commandCache.js'

async function ClientConstructorCalled() {
    const print = await globalThis.GetSigmaPackage('sigmaLog', true)
    print('CLIENT', 'Initializing Client Class')
}

// GetSigmaPackage is async, so, well, wrap it in another function
// This is a temporary solution- I'll change it to just use import {} from 'sigmaframework' sometime in the future
async function p(a, b) {
    const print = await globalThis.GetSigmaPackage('sigmaLog', true)
    print(a, b)
}

// Self explanatory; declares if the build is developer-only (for now it has no impact- but it'll be given a use in the future)
interface initOptions {
    isDevBuild: boolean
}

class SigmaClient extends Client {
    constructor(options: any) {
        super(options)
        this.on('interactionCreate', (interaction: Interaction) => {
            if(!interaction.isChatInputCommand()) return
            p('CLIENT_EVENT', interaction) 

            // Find the command in the cache, then run it
            const cmd = commands.get(interaction.commandName)
            p('CACHE_SEARCH', cmd)
            if(cmd) {
                cmd.run(interaction)
            }
        })
        // TO-DO: switch this to p()
        ClientConstructorCalled()
    }
    static init(token: string, options: initOptions) {
        // Client initialization is handled someplace else - so we redirect it to there
        return InitClient(token, options)
    }
    public on(event: any, listener: any): this {
        super.on(event, listener)
        p('CLIENT_EVENT_LISTENER', event)
        p('CLIENT_EVENT_LISTENER', listener)
        return this
    }
}

export default SigmaClient