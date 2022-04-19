export interface APIGuild {
	id: string;
	name: string;
	icon?: string;
	channels: APIChannel[];
}

export interface APIUser {
	username: string;
	discriminator: string;
	id: string;
	bot: boolean;
}

export interface APIMessage {
	id: string;
	content: string;
	guild_id: string;
	channel_id: string;
	author: APIUser;
}

export interface APIChannel {
	id: string;
	name: string;
}
