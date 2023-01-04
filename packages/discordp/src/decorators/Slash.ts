import { SlashInfo } from "../interfaces/slash/SlashInfo";
import { SlashStorage } from "../storage/SlashStorage";

export function Slash(info: SlashInfo): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const { name, description } = info

        SlashStorage.allSlash.set(name, {
            name, description: description ? description : "",
            execute: descriptor.value
        })
    }
}