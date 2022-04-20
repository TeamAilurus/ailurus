import type { Client } from '#client/Client';
import { User } from '#structures/User';
import { log } from '#utils/logger';
import type { APIMessage, RESTPostAPIChannelMessageJSONBody, Snowflake } from 'discord-api-types/v10';
import { fetch } from 'undici';
import { Base } from './Base';
import type { Channel } from './Channel';
import type { Guild } from './Guild';
export class Message extends Base {
	public id: Snowflake = this.data.id;
	public content: string = this.data.content;
	public guild?: Guild = this.data.guild_id ? this.client.guilds.get(this.data.guild_id) : undefined;
	public channel?: Channel = this.client.channels.get(this.data.channel_id);
	public author?: User = new User(this.data.author.id, this.data.author.username, this.data.author.discriminator, this.data.author.bot || false);

	public constructor(private data: APIMessage, client: Client) {
		super(client);
	}

	public async reply(payload: Omit<RESTPostAPIChannelMessageJSONBody, 'message_reference'>) {
		if (!this.channel) throw new Error('Cannot reply to a message that does not have a channel.');

		const res = await fetch(`https://discord.com/api/v10/channels/${this.channel.id}/messages`, {
			method: 'POST',
			body: JSON.stringify({
				...payload,
				message_reference: {
					message_id: this.id
				}
			}),
			headers: {
				Authorization: `Bot ${this.client.token}`,
				'Content-Type': 'application/json'
			}
		});

		if (res.ok) {
			const apiMessage = (await res.json()) as APIMessage;

			const user = new User(apiMessage.author.id, apiMessage.author.username, apiMessage.author.discriminator, apiMessage.author.bot || false);

			if (!user) throw new Error('User not found');

			return new Message(apiMessage, this.client);
		}

		const json = await res.json();
		log({ state: 'DEBUG', json });

		throw new Error(`${res.status} ${res.statusText}`);
	}
}
