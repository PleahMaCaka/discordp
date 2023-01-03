import { CommandInteraction } from "discord.js";
import { Slash } from "discordp/build/esm/decorators/Slash";

export class ExampleCommand {

    @Slash({ name: "example", description: "Very Simple Example Slash Command" })
    async execute(interaction: CommandInteraction) {
        await interaction.reply("Hello World!");
    }

}