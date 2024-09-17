import commands from "./cache/commandCache.js"
import { Client, Events, Routes } from "discord.js"
import SigmaCommandInteraction from "./interaction/interactionObj.js"

interface commandOptions {
    name: string,
    description: string,
    permissions: {
        developer: boolean
    },
    run: Function,
    options: [{
        name: string,
        type: number,
        description: string
    }]
}

class Commands {
    static async new(commandOptions: commandOptions) {
        const client: Client<true> = globalThis.activeClient

        const print = await globalThis.GetSigmaPackage('sigmaLog', true)
        print('COMMANDS', `Loading command: ${commandOptions.name}`)

        // Use the REST api to register the command
        client.rest.post(Routes.applicationCommands(client.user.id), {
            body: {
                name: commandOptions.name,
                description: commandOptions.description,
                type: 1,
                options: commandOptions.options,
                integration_types: [0],
                contexts: [0, 1],
            },
        })
        
        // Save the command to the cache
        commands.set(commandOptions.name, { run: commandOptions.run, permissions: commandOptions.permissions })
    }
}

export default Commands