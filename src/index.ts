import './SigmaFramework/loadPackage.js';
const GetSigmaPackage = globalThis.GetSigmaPackage;

async function main() {
    const SigmaClient = await GetSigmaPackage('sigmaClient', true);
    const SigmaCommands = await GetSigmaPackage('commands', true);

    const token = process.env.TOKEN;
    await SigmaClient.init(token, { isDevBuild: true });
    console.log(SigmaClient)

    setTimeout(() => {
        SigmaCommands.new({ name: 'test', description: 'A test of the SigmaCommands.new method', permissions: { developer: true }, run: (i) => { i.reply('i.reply() successful!') }})
    }, 500)
}

main()