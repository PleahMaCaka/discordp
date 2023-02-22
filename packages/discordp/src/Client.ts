import { Client as ClientJS } from "discord.js";

export class Client extends ClientJS {

    async initClientCommands(): Promise<void> {
        this.once("ready", () => {
            console.log("Bot is ready to deploy!")
        })
    }

}