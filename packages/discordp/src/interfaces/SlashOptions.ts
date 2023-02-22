import { CommandInteraction } from "discord.js";
import { SubSlashOptions } from "./SubSlashOptions";

export interface SlashOptions {

    group?: string
    name: string
    description?: string

    run: (interaction: CommandInteraction) => Promise<void> | void

    sub?: SubSlashOptions[]

}