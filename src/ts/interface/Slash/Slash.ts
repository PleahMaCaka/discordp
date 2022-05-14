import { CommandInteraction } from "discord.js";
import { Client } from "../../../Client";

export interface Slash {
	name: string
	description?: string

	execute(interaction: CommandInteraction, client?: Client): any
}