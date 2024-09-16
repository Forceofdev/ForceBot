import {GetSigmaPackage, print} from 'sigmaframework'
import { CommandInteraction } from 'discord.js';

async function testCommand(interaction) {
    const commands = await globalThis.GetSigmaPackage('commands')
    const SigmaCommandInteraction = commands.SigmaCommandInteraction
    const sigma_interaction = Object.setPrototypeOf(interaction, SigmaCommandInteraction.prototype);

    sigma_interaction.sendEmbed({ title: 'sigma_interaction prototype test', text: 'A test of the new sigma_interaction prototype override for the CommandInteraction class' })
}

async function handleJsExecute(interaction: CommandInteraction) {
    const r = interaction.options.get('execution_code')
    if(typeof r.value !== 'string') return
    eval(r.value)
    print('COMMANDS', 'Received JS command')
}

async function main() {
    const SigmaClient = await GetSigmaPackage('sigmaClient', true);
    const SigmaCommands = await GetSigmaPackage('commands', true)

    const token = process.env.TOKEN;
    const a = await SigmaClient.init(token, { isDevBuild: true });

    a.on('ready', () => {
        SigmaCommands.new({ name: 'js_execute', description: 'Execute javascript', permissions: { developer: true }, run: handleJsExecute, options: [{ name: 'execution_code', description: 'uhmmmm... skibidi?', type: 3 }]})
        SigmaCommands.new({ name: 'test', description: 'A test of the SigmaCommands.new method', permissions: { developer: true }, run: testCommand})
    })
}

main()

// (() => { const cmds = GetSigmaPackage('commands', true).then((SigmaCommands) => { SigmaCommands.new({ name: 'runcode', description: 'Test command!!', permissions: { developer: true }, run: (interaction) => { interaction.reply('hello from runtime!') }}) }) })()