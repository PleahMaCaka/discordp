import { CommandInteraction } from "discord.js";
import { Slash } from "../../package/ts/interface/Slash";

export const example: Slash = {
	name: "example",
	description: "example command",
	async execute(interaction: CommandInteraction): Promise<any> {
		await interaction.reply("EXAMPLE")
	}
}