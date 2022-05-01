import { Client } from "../src/Client";
import { example } from "./commands/example";
import { ALL_INTENTS } from "../src/util/AllIntents";

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