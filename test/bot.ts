import { Client } from "../package/Client";
import { ALL_INTENTS } from "../package/util/AllIntents";
import { example } from "./commands/example";

const config = require("./config.json")

const client = new Client({
	intents: ALL_INTENTS
}, true)

client.once("ready", () => {
	console.log(`${client.user.username} is ready!`)
})

client.addSlash(example)

client.login(config.TOKEN).then(token => {
	client.deploy(token)
})