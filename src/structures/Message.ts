import type { Client } from '#client/Client';
import type { APIMessage } from '../types';
import type { Guild } from '#structures/Guild';
import { Base } from '#structures/Base';
import type { Channel } from '#structures/Channel';
import { User } from '#structures/User';
import { log } from '#utils/logger';
import { fetch } from 'undici';

export class Message extends Base {
	public constructor(
		public id: string,
		public content: string,
		public guild: Guild,
		public channel: Channel,
		public author: User,
		client: Client,
		public reference?: string
	) {
		super(client);
	}

	public async reply(content: string) {
		const res = await fetch(`https://discord.com/api/v10/channels/${this.channel.id}/messages`, {
			method: 'POST',
			body: JSON.stringify({
				content,
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

			const user = new User(apiMessage.author.id, apiMessage.author.username, apiMessage.author.discriminator, apiMessage.author.bot);

			if (!user) throw new Error('User not found');

			return new Message(apiMessage.id, apiMessage.content, this.guild, this.channel, user, this.client, this.id);
		}

		const json = await res.json();
		log({ state: 'DEBUG', json });

		throw new Error(`${res.status} ${res.statusText}`);
	}
}
