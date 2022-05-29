import { Client as ClientJS, ClientOptions } from "discord.js"

export class Client extends ClientJS {

	//////////////////////////////
	// PRIVATE VARIABLES
	//////////////////////////////

	pClientOptions: pClientOptions
	static pClientOptions: pClientOptions

	public static client: Client

	//////////////////////////////
	// CONSTRUCTOR
	//////////////////////////////

	constructor(
		options: ClientOptions,
		pClientOptions: pClientOptions = {
			debug: false
		}
	) {
		super(options)
		this.pClientOptions = pClientOptions
		Client.client = this
		Client.pClientOptions = pClientOptions
	}

	//////////////////////////////
	// FUNCTIONS
	//////////////////////////////

	public static getInstance(): Client {
		return this.client
	}

}