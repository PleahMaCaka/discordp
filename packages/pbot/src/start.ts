import { CommandInteraction } from "discord.js";
import { Client } from "discordp"
import { Slash } from "discordp/build/esm/commands/Slash";
import { ALL_INTENTS } from "discordp/build/esm/utils/ALL_INTENTS";
import { TOKEN } from "../config.json"


const client = new Client({
    intents: [
        ALL_INTENTS
    ]
})

new Slash({
    name: "test",
    run: async (interaction: CommandInteraction) => {
        await interaction.reply("Hello World!")
    }
}).register()

client.initClientCommands()

client.login(TOKEN)