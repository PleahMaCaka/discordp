import {Client as ClientJS} from "discord.js";
import {CustomClientOptions} from "./typescript/interfaces/CustomClientOptions";

class Client extends ClientJS {

    constructor(options: CustomClientOptions) {
        super(options);
    }

}