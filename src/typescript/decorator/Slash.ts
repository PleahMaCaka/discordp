import { SlashInfo } from "../interface/slash/SlashInfo";
import { SlashClient } from "../../commands/SlashClient";

export function Slash(info: SlashInfo): Function {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const { name, description } = info

		SlashClient.allSlash.set(name, {
			name, description: description ? description : "",
			execute: descriptor.value
		})
	}
}