import { ClientOptions } from "discord.js";

export interface PClientOptions extends ClientOptions {
    usingAutoInitApplicationCommands?: boolean
}