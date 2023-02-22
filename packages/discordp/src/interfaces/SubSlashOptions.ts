import { CommandInteraction } from "discord.js";

export interface SubSlashOptions {

    name?: string
    description?: string

    run: (interaction: CommandInteraction) => Promise<void> | void

}