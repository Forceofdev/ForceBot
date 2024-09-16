import { CommandInteraction, Routes } from "discord.js";

interface EmbedOptions {
    title: string,
    text: string,
}

/**
 * SigmaFramework interaction handler
 */

class SigmaCommandInteraction extends CommandInteraction {
    sendEmbed(embOptions: EmbedOptions) {
        this.client.rest.post(Routes.interactionCallback(this.id, this.token), {
            body: {
                type: 4,
                data: {
                    embeds: [{
                        title: embOptions.title,
                        description: embOptions.text
                    }]
                }
            }
        })
    }
}

export default SigmaCommandInteraction