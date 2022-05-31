import { Collection } from "discord.js";
import { SlashMeta } from "../typescript/interface/slash/meta/SlashMeta";
import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Client } from "../Client";
import { DeployType } from "../typescript/type/DeployType";
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord-api-types/v9";
import Logger from "@pleahmacaka/logger";
import { EventClient } from "./EventClient";

export class SlashClient {

	////////////////////////////
	// PRIVATE VARIABLE
	////////////////////////////
	// Collection is extends Vanilla Map, is more effective,
	// and it is included in discord.js!

	/**
	 * @description Include all of the slash
	 * @private
	 */
	public static allSlash: Collection<string, SlashMeta> = new Collection<string, SlashMeta>()

	private static _allSlashNames: string[] = []

	//////////////////////////////
	// GET SLASHES
	////////////////////
	// Don't be using to here try-catch and don't add void to return type

	/**
	 * @param key - registered slash name
	 * @description
	 */
	public static getSlash(key: string): SlashMeta | undefined {
		return this.allSlash.get(key)
	}

	public static getAllSlash(): SlashMeta[] {
		return this.allSlash.map(slash => slash)
	}

	//////////////////////////////
	// DEPLOY
	////////////////////

	/**
	 * @param token - discord bot token, same as when using login
	 * @param deployType - default "GUILD", it is deploying all GUILD
	 * @param handler - if you not give false, using discordp's interaction handlers
	 */
	public static deploy(token: string, deployType: DeployType = "GUILD", handler: boolean = true): void {
		const rest = new REST({ version: '9' }).setToken(token)
		const debug = Client.pClientOptions.debug
		const slashJson: RESTPostAPIApplicationCommandsJSONBody[] = []

		if (debug) {
			Logger.log("INFO", "Starting deploy (/) commands.")
			Logger.log("DEBUG", "✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧")
			Logger.log("DEBUG", "ALL SLASHES :")
			SlashClient.getAllSlash().forEach(slash => {
				Logger.log("DEBUG", `${slash.name} :: ${slash.description}`)
			})
			Logger.log("DEBUG", "✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧")
		}

		// get slash data for build
		this.getAllSlash().forEach(async slash => {
			const build = new SlashCommandBuilder()
				.setName(slash.name)
				.setDescription(slash.description ? slash.description : "")

			if (slash.subcommands) {
				const subArr: SlashCommandSubcommandBuilder[] = []

				slash.subcommands.forEach(sub => {
					subArr.push(
						new SlashCommandSubcommandBuilder()
							.setName(sub.name)
							.setDescription(sub.description ? sub.description : "")
					)
				})

				subArr.forEach(sub => {
					build.addSubcommand(sub)
				})
			}
			slashJson.push(build.toJSON())
			if (debug) Logger.log("DEBUG", "SLASH BUILD SUCCESS")
		})
		if (deployType == "GUILD") {
			Client.getInstance().guilds.cache.map(guild => guild.id).forEach(async guild => {
				if (Client.pClientOptions.debug) Logger.log("DEBUG", `DEPLOY -> ${guild}`)
				try {
					await rest.put(
						Routes.applicationGuildCommands(Client.getInstance().user!.id, guild),
						{ body: slashJson }
					)
				} catch (e) {
					Logger.log("ERROR", `CAN'T DEPLOY SLASHES! [TYPE -> ${deployType}]`)
					console.log(e)
				}
			})
		}
		EventClient.interactionHandler()
	}

}