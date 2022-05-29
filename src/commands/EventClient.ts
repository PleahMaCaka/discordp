import { Client } from "../Client";
import { InteractionHandlerOptions } from "../typescript/interface/InteractionHandlerOptions";
import { SlashClient } from "./SlashClient";
import Logger from "@pleahmacaka/logger";

export class EventClient {

	public static interactionHandler(
		options: InteractionHandlerOptions = {
			slash: true
		}
	) {
		if (options.slash) this.slashInteractionHandler()
	}

	private static slashInteractionHandler() {
		Client.getInstance().on("interactionCreate", async (interaction) => {
			if (!interaction.isCommand()) return;

			// 1. check the subcommand
			// 2. if is subcommand interaction -> execute subcommand
			// 3. else execute normally slash
			// 4. if error stuff, check the allSlash Collection.
			// if we have errored command, logging command name and error message
			// else logging unknown command name and error message

			const { commandName } = interaction
			const { getSubcommand } = interaction.options

			if (!SlashClient.getSlash(commandName)) return Logger.log("ERROR", `Cannot find slash -> ${commandName} <-`)

			// If there is no return value when the getSubCommand() function is used, it is terminated...?
			if (SlashClient.getSlash(commandName)?.subcommands?.size) {
				try {
					await SlashClient.getSlash(commandName)!.subcommands!.get(getSubcommand())!.execute()
				} catch (e) {
					Logger.log("ERROR", `Cannot find subcommand -> ${commandName} :: ${getSubcommand()} <-`)
					return console.log(e)
				}
			} else {
				try {
					await SlashClient.getSlash(commandName)!.execute()
				} catch (e) {
					Logger.log("ERROR", `Cannot execute slash -> ${commandName} <-`)
					return console.log(e)
				}

			}
		})
	}

}