import { GatewayIntentBits } from "discord.js"
import {GetSigmaPackage} from 'sigmaframework'

export default async function InitClient(token: string, options: { isDevBuild: boolean }) {
    const SigmaClient = await GetSigmaPackage('sigmaClient', true)

    const readyClient = new SigmaClient({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],}) // Default intents

    globalThis.activeClient = readyClient // Make the client globally available (so you don't have to have it passed in arguments for all the external functions)

    readyClient.login(token)
    return readyClient
}