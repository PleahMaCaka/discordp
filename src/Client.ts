import { Client as ClientJS, ClientOptions } from "discord.js"

export class Client extends ClientJS {

	pClientOptions: pClientOptions
	static pClientOptions: pClientOptions

	private readonly client: Client
	static client: Client

	constructor(options: ClientOptions, pClientOptions: pClientOptions) {
		super(options)
		this.client = this
		this.pClientOptions = pClientOptions
	}

	public static getInstance(): Client {
		return this.client
	}
}