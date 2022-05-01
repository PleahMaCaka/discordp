import { Slash } from "../../build/ts/interface/Slash";
import { CommandInteraction } from "discord.js";

export const example: Slash = {
	name: "example",
	description: "example command",
	async execute(interaction: CommandInteraction): Promise<any> {
		await interaction.reply("EXAMPLE")
	}
}