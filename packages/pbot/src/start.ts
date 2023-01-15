import { GatewayIntentBits as Intent } from "discord-api-types/v10";
import { Client } from "discordp";
import { Logger } from "discordp/build/esm/utils/Logger";
import { TOKEN } from "../config.json"

const client = new Client({
    intents: [
        Intent.Guilds,
        Intent.GuildMembers,
        Intent.GuildBans,
        Intent.GuildEmojisAndStickers,
        Intent.GuildIntegrations,
        Intent.GuildWebhooks,
        Intent.GuildInvites,
        Intent.GuildVoiceStates,
        Intent.GuildPresences,
        Intent.GuildMessages,
        Intent.GuildMessageReactions,
        Intent.GuildMessageTyping,
        Intent.DirectMessages,
        Intent.DirectMessageReactions,
        Intent.DirectMessageTyping,
        Intent.MessageContent,
        Intent.GuildScheduledEvents,
        Intent.AutoModerationConfiguration,
        Intent.AutoModerationExecution,
    ]
})

client.once("ready", () => {
    Logger.info("Ready!")
})

client.login(TOKEN).then(() => {
    Logger.info(`===> Logged in as ${client.user?.tag}`)
})