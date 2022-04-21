import { log } from 'console';
import { APIInteraction, APIMessage, RESTPostAPIChannelMessageJSONBody, Routes, Snowflake } from 'discord-api-types/v10';
import type { Client } from '../client';
import { Base } from './Base';
import type { Channel } from './Channel';
import type { Guild } from './Guild';
import { GuildMember } from './GuildMember';
import { Message } from './Message';
import { User } from './User';
export class Interaction extends Base {
	public readonly id: Snowflake = this.raw.id;

	public readonly guild?: Guild = this.raw.guild_id ? this.client.guilds.get(this.raw.guild_id) : undefined;
	public readonly channel?: Channel = this.raw.channel_id ? this.client.channels.get(this.raw.channel_id) : undefined;

	public readonly user?: User = this.raw.user ? new User(this.raw.user) : undefined;
	public readonly member?: GuildMember = this.guild
		? this.user
			? this.raw.member
				? new GuildMember(this.raw.member, this.user, this.guild, this.client)
				: undefined
			: undefined
		: undefined;

	private readonly token: string = this.raw.token;

	public constructor(private raw: APIInteraction, client: Client) {
		super(client);
	}

	public async reply(payload: Omit<RESTPostAPIChannelMessageJSONBody, 'message_reference'>) {
		if (!this.client.user) throw new Error('Client user not set');

		const res = await this.client.rest.post(
			Routes.interactionCallback(this.id, this.token),
			JSON.stringify({
				type: 4,
				data: {
					...payload
				}
			})
		);

		if (res.ok) {
			const res = await this.client.rest.get(Routes.webhookMessage(this.client.user.id, this.token));

			if (!res.ok) throw new Error(`Failed to get original message: ${res.status} ${res.statusText}`);

			const apiMessage = (await res.json()) as APIMessage;

			return new Message(apiMessage, this.client);
		}

		const json = await res.json();
		log({ state: 'DEBUG', json });

		throw new Error(`${res.status} ${res.statusText}`);
	}
}
