import {Client, ClientOptions} from 'discord.js'
import InitClient from './functions/initializeClient.js'
import { promisify } from 'util'

const print = await globalThis.GetSigmaPackage('sigmaLog', true)
interface initOptions {
    isDevBuild: boolean
}

class SigmaClient extends Client {
    constructor(options) {
        super(options)
        print('CLIENT', 'Initializing Client Class')
    }
    static init(token: string, options: initOptions) {
        const r = InitClient(token, options)
        return r        
    }
}

export default SigmaClient