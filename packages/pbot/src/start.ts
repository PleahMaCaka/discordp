import { GatewayIntentBits as Intent } from "discord-api-types/v10";
import { Client } from "discordp";

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
    console.log("Ready!")
})

client.login("TOKEN")
