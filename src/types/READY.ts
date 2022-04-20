import type { APIUser } from 'discord-api-types/v10';

export interface ReadyPayload {
	user: APIUser;
	guilds: ReadyGuild[];
}

export interface ReadyGuild {
	id: string;
	unavailable: true;
}
