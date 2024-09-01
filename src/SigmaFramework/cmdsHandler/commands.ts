import commands from "./cache/commandCache.js"
import { Client, CommandInteraction, Events, Routes } from "discord.js"

interface commandOptions {
    name: string,
    description: string,
    permissions: {
        developer: boolean
    },
    run: Function,
}

class Commands {
    static async new(commandOptions: commandOptions) {
        const client: Client<true> = globalThis.activeClient

        const print = await globalThis.GetSigmaPackage('sigmaLog', true)
        print('COMMANDS', `Loading command: ${commandOptions.name}`)

        client.rest.post(Routes.applicationCommands(client.user.id), {
            body: {
                name: commandOptions.name,
                description: commandOptions.description,
                type: 1,
                integration_types: [0],
                contexts: [0, 1],
            },
        })

        commands.set(commandOptions.name, { run: commandOptions.run, permissions: commandOptions.permissions })
        client.on(Events.InteractionCreate, interaction => {
            if (!interaction.isCommand()) return
            print('COMMANDS', `Command requested: ${interaction.commandName}`)

            if (interaction.commandName == commandOptions.name) commandOptions.run(interaction)
        })
    }
}

export default Commands