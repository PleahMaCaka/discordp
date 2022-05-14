import { SlashInfo } from "../ts/interface/Slash/SlashInfo";
import Logger from "@pleahmacaka/logger";
import { Slash } from "../ts/interface/Slash/Slash";
import { SlashClientOptions } from "../ts/interface/SlashClient/SlashClientOptions";
import { DeployType } from "../ts/types/DeployType";
import { Collection } from "discord.js";
import { REST } from "@discordjs/rest";
import { Client } from "../Client";
import { Routes } from "discord-api-types/v9";

export class SlashClient {

	//////////////////////////////
	// Constructor
	//////////////////////////////
	constructor(options?: SlashClientOptions) {
		if (!options.slashInteractionHanding) options.slashInteractionHanding = true

		if (options.slashInteractionHanding) SlashClient._slashInteractionHandler()
	}

	//////////////////////////////
	// PRIVATE VARIABLE
	//////////////////////////////
	// Collection is extends Vanilla Map, is more effective,
	// and it is included in discord.js!

	private static instance: SlashClient

	/**
	 * @description Map of SlashObject, include executable function
	 * @private
	 */
	private static _allSlash: Collection<string, Slash> = new Collection<string, Slash>()

	/**
	 * @description Map of SlashInfo, **not include executable function**
	 * @private
	 */
	private static _allSlashInfo: Collection<string, SlashInfo> = new Collection<string, SlashInfo>()

	//////////////////////////////
	// PRIVATE FUNCTIONS
	//////////////////////////////

	private static _slashInteractionHandler(): void {
		Client.getInstance().once("interactionCreate", async (interaction) => {
			if (!interaction.isCommand()) return
			try {
				await SlashClient.getSlash(interaction.commandName).execute(interaction, Client.getInstance())
			} catch (e) {
				SlashClient.getAllSlashInfo().forEach(slashInfo => {
					if (interaction.commandName == slashInfo.name) {
						Logger.log("DEBUG", `${interaction.commandName} is something wrong!`)
						console.log(e)
					} else {
						return console.error(`unknown command is executed! -> What is [${interaction.commandName}]?`)
					}
				})
			}
		})
	}

	//////////////////////////////
	// FUNCTIONS
	//////////////////////////////

	public static getInstance(): SlashClient {
		return this.instance || (this.instance = new this())
	}

	//////////////////////////////
	// ADD SLASH FUNCTION
	////////////////////

	public static addSlash(slash: Slash): void {
		// TODO verity slash name
		this._allSlash.set(slash.name, slash)
		this._allSlashInfo.set(slash.name, <SlashInfo>{
			name: slash.name,
			description: slash.description ? slash.description : ""
		})
	}

	public addSlash(slash: Slash): void {
		SlashClient.addSlash(slash)
	}

	//////////////////////////////
	// GET SLASHES
	////////////////////
	// Don't be using to here try-catch and don't add void to return type

	public static getSlash(key: string): Slash {
		return this._allSlash.get(key)
	}

	public static getAllSlash(): Slash[] {
		return this._allSlash.map(slash => slash)
	}

	public static getSlashInfo(key: string): SlashInfo {
		return this._allSlashInfo.get(key)
	}

	public static getAllSlashInfo(): SlashInfo[] {
		return this._allSlashInfo.map(slashInfo => slashInfo)
	}

	//////////////////////////////
	// DEPLOY
	////////////////////

	/**
	 * @param token - discord bot token, same as when using login
	 * @param deployType - default "GUILD", it is deploying all GUILD
	 */
	public static deploy(token: string, deployType: DeployType = "GUILD"): void {
		// TODO Automatic command deploy, when the bot join to the guild
		const rest = new REST({ version: '9' }).setToken(token)

		if (Client.pClientOptions.debug) {
			Logger.log("INFO", "Starting deploy (/) commands.")
			Logger.log("DEBUG", "✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧")
			Logger.log("DEBUG", "ALL SLASH:")
			this._allSlashInfo.forEach(slash => {
				Logger.log("DEBUG", `${slash.name} :: ${slash.description}`)
			})
			Logger.log("DEBUG", "✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧")
		}

		if (deployType == "GUILD") {
			Client.getInstance().guilds.cache.map(guild => guild.id).forEach(async guild => {
				if (Client.pClientOptions.debug) Logger.log("DEBUG", `DEPLOY -> ${guild}`)
				try {
					await rest.put(
						Routes.applicationGuildCommands(Client.getInstance().user!!.id, guild),
						{ body: this._allSlashInfo }
					)
				} catch (e) {
					console.log(e)
				}
			})
		}

		if (deployType == "GLOBAL") {
			try {
				rest.put(
					Routes.applicationCommands(Client.getInstance().user!!.id),
					{ body: this._allSlashInfo }
				).then(() => {
					Logger.log("INFO", "GLOBALLY DEPLOYED!")
				})
			} catch (e) {
				console.error(e)
			}
		}
	}
}