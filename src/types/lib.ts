import type { Channel, Guild, Message } from '../structures';

export interface ClientOptions {
	token?: string;
	intents: number;
}

export const enum RequestMethod {
	Delete = 'DELETE',
	Get = 'GET',
	Patch = 'PATCH',
	Post = 'POST',
	Put = 'PUT'
}

export interface ClientEvents {
	channelCreate: [Channel];
	channelDelete: [Channel];
	guildCreate: [Guild];
	guildDelete: [Guild];
	message: [Message];
	ready: [];
}
