import { log } from 'console';
import type { APIMessage, RESTPostAPIChannelMessageJSONBody, Snowflake } from 'discord-api-types/v10';
import type { Client } from '../client';
import { Base } from './Base';
import type { Channel } from './Channel';
import type { Guild } from './Guild';
import { User } from './User';
export class Message extends Base {
	public readonly id: Snowflake = this.raw.id;

	public content: string = this.raw.content;

	public readonly guild?: Guild = this.raw.guild_id ? this.client.guilds.get(this.raw.guild_id) : undefined;
	public readonly channel?: Channel = this.client.channels.get(this.raw.channel_id);

	public readonly author?: User = new User(this.raw.author);
	public readonly webhookId?: Snowflake = this.raw.webhook_id;

	public constructor(private raw: APIMessage, client: Client) {
		super(client);
	}

	public async reply(payload: Omit<RESTPostAPIChannelMessageJSONBody, 'message_reference'>) {
		if (!this.channel) throw new Error('Cannot reply to a message that does not have a channel.');

		const res = await this.client.rest.post(
			`/channels/${this.channel.id}/messages`,
			JSON.stringify({
				...payload,
				message_reference: {
					message_id: this.id
				}
			})
		);

		if (res.ok) {
			const apiMessage = (await res.json()) as APIMessage;

			const user = new User(apiMessage.author);

			if (!user) throw new Error('User not found');

			return new Message(apiMessage, this.client);
		}

		const json = await res.json();
		log({ state: 'DEBUG', json });

		throw new Error(`${res.status} ${res.statusText}`);
	}
}
