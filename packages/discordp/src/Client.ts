import { Client as ClientJS } from "discord.js";
import { PClientOptions } from "./interfaces/PClientOptions";

export class Client extends ClientJS {


    constructor(options: PClientOptions) {
        super(options)
    }

}