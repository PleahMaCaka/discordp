import { SlashClient } from "../../commands/SlashClient";
import { SubSlashInfo } from "../interface/slash/SubSlashInfo";
import { Collection } from "discord.js";
import { SubSlashMeta } from "../interface/slash/meta/SubSlashMeta";
import Logger from "@pleahmacaka/logger";

export function SubSlash(info: SubSlashInfo) {
	// TODO if interface(SlashMeta, SubSlashMeta.
	const original = SlashClient.allSlash.get(info.root)
	if (!original) return Logger.log("ERROR", `Cannot find ${info.root}, check the @SubSlash Decorators`)

	return function (target: any, key: string, descriptor: PropertyDescriptor) {
		const { name, description } = info

		const sub = new Collection<string, SubSlashMeta>()

		// if already have subcommand more than one
		// copy -> include sub in already registered subcommands
		if (original.subcommands?.size) { // 0 === false
			original.subcommands.forEach(originalSub => {
				sub.set(originalSub.name, {
					name: originalSub.name,
					description: originalSub.description,
					execute: originalSub.execute
				})
			})
		}

		// and register SubSlash
		sub.set(name, {
			name, description,
			execute: descriptor.value
		})

		SlashClient.allSlash.set(info.root, {
			name, description,
			execute: original!!.execute,
			subcommands: sub
		})
	}
}
