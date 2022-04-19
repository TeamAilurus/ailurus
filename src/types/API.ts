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

export interface SlashCommand {
	version: number;
	type: number;
	token: string;
	member: Member;
	locale: string;
	id: string;
	guild_locale: string;
	guild_id: string;
	data: SlashCommandData;
	channel_id: string;
	application_id: string;
}

export interface SlashCommandData {
	type: number;
	id: string;
}

export interface Member {
	user: APIUser;
	premium_since: null;
	permissions: string;
	pending: boolean;
	nick: null;
	mute: boolean;
	joined_at: Date;
	is_pending: boolean;
	flags: number;
	deaf: boolean;
	communication_disabled_until: null;
	avatar: null;
	hoisted_role: string;
}

export interface APIChannel {
	id: string;
	name: string;
}
