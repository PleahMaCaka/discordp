import { BaseSlashMeta } from "./BaseSlashMeta";
import { SubSlashMeta } from "./SubSlashMeta";
import { Collection } from "discord.js";

export interface SlashMeta extends BaseSlashMeta {
	subcommands?: Collection<string, SubSlashMeta>
}