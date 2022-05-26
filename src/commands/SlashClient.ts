import { SubSlashInfo } from "../typescript/interface/slash/SubSlashInfo";
import { SlashInfo } from "../typescript/interface/slash/SlashInfo";
import { Collection } from "discord.js";
import { Client } from "../Client";
import { SlashMeta } from "../typescript/interface/slash/meta/SlashMeta";

export class SlashClient {

	////////////////////////////
	// PRIVATE VARIABLE
	////////////////////////////
	// Collection is extends Vanilla Map, is more effective,
	// and it is included in discord.js!

	/**
	 * @description Included all of the slash, you can do it everything
	 * @private
	 */
	public static allSlash: Collection<string, SlashMeta> = new Collection<string, SlashMeta>()


	//////////////////////////////
	// GET SLASHES
	////////////////////
	// Don't be using to here try-catch and don't add void to return type

	public static getSlash(key: string): SlashInfo | undefined {
		return this.allSlash.get(key)
	}

	public static getAllSlash(): SlashInfo[] {
		return this.allSlash.map(slash => slash)
	}

	//////////////////////////////
	// DEPLOY
	////////////////////

	// /**
	//  * @param token - discord bot token, same as when using login
	//  * @param deployType - default "GUILD", it is deploying all GUILD
	//  */
	// public static deploy(token: string, deployType: DeployType = "GUILD"): void {
	// 	// TODO Automatic command deploy, when the bot join to the guild
	// 	const rest = new REST({ version: '9' }).setToken(token)
	//
	// 	if (Client.pClientOptions.debug) {
	// 		Logger.log("INFO", "Starting deploy (/) commands.")
	// 		Logger.log("DEBUG", "✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧")
	// 		Logger.log("DEBUG", "ALL SLASH:")
	// 		this._allSlashInfo.forEach(slash => {
	// 			Logger.log("DEBUG", `${slash.name} :: ${slash.description}`)
	// 		})
	// 		Logger.log("DEBUG", "✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧")
	// 	}
	//
	// 	if (deployType == "GUILD") {
	// 		Client.getInstance().guilds.cache.map(guild => guild.id).forEach(async guild => {
	// 			if (Client.pClientOptions.debug) Logger.log("DEBUG", `DEPLOY -> ${guild}`)
	// 			try {
	// 				await rest.put(
	// 					Routes.applicationGuildCommands(Client.getInstance().user!!.id, guild),
	// 					{ body: this._allSlashInfo }
	// 				)
	// 			} catch (e) {
	// 				console.log(e)
	// 			}
	// 		})
	// 	}
	//
	// 	if (deployType == "GLOBAL") {
	// 		try {
	// 			rest.put(
	// 				Routes.applicationCommands(Client.getInstance().user!!.id),
	// 				{ body: this._allSlashInfo }
	// 			).then(() => {
	// 				Logger.log("INFO", "GLOBALLY DEPLOYED!")
	// 			})
	// 		} catch (e) {
	// 			console.error(e)
	// 		}
	// 	}
	// }
}