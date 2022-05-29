import { Client } from "../package/Client";
import { ALL_INTENTS } from "../package/Utils/AllIntents";
import { Slash } from "../package/TypeScript/Decorator/Slash";
import { SlashClient } from "../package/commands/SlashClient";
import { CommandInteraction } from "discord.js";


const config = require("./config.json")

const client = new Client(
	{
		intents: ALL_INTENTS
	},
	{
		debug: true
	}
)

class ExampleCommand {
	@Slash({ name: "example", description: "that is example slash command!" })
	public async example(interaction: CommandInteraction) {
		console.log("test example command is executed!")
		await interaction.reply("stuff")
	}

}

client.once("ready", () => {
	console.log(`${client.user!.username} is ready!`)
})

client.login(config.TOKEN).then(token => {
	SlashClient.deploy(token)
})