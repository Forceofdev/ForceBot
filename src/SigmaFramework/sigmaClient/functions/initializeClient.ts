import { GatewayIntentBits } from "discord.js"

const GetSigmaPackage = globalThis.GetSigmaPackage

export default async function InitClient(token: string, options: { isDevBuild: boolean }) {
    const SigmaClient = await GetSigmaPackage('sigmaClient', true)

    const readyClient = new SigmaClient({intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ],}) // Default intents

    globalThis.activeClient = readyClient

    readyClient.login(token)
    return readyClient
}