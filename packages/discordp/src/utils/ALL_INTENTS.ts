import { GatewayIntentBits } from "discord-api-types/v10";

export const ALL_INTENTS
    = Object.keys(GatewayIntentBits).map((key) =>
    GatewayIntentBits[key as keyof typeof GatewayIntentBits])