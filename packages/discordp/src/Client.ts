import { Client as ClientJS, ClientOptions } from "discord.js";

export class Client extends ClientJS {

    constructor(options: ClientOptions) {
        super(options)
    }

    stuff = 1

}