import { Client } from "../package/Client"
import { ALL_INTENTS } from "../package/util/AllIntents"
import { example } from "./Commands/Commands"

const config = require("./config.json")

const client = new Client(
	{
		intents: ALL_INTENTS
	}, true
)

client.addSlash(example)

client.once("ready", () => {
	console.log(`${client.user.username} is ready!`)
})

client.login(config.TOKEN).then(token => {
	client.deploy(token)
})