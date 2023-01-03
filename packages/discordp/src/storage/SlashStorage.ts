import { Collection } from "discord.js";
import { SlashData } from "../interfaces/slash/SlashData";

export class SlashStorage {

    static allSlash = new Collection<string, SlashData>()

}