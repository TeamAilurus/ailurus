import type { APIUser } from ".";

export interface ReadyPayload {
	user: APIUser;
	guilds: ReadyGuild[];
}

export interface ReadyGuild {
	id: string;
	unavailable: true;
}
