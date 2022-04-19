import type { Client } from '#client/Client';
import type { SlashCommandData } from '#types/API';
import { fetch } from 'undici';
import { Base } from './Base';
import type { Channel } from './Channel';
import type { Guild } from './Guild';
import type { Member } from './Member';

export class SlashCommandInteraction extends Base {
	public constructor(
		private token: string,
		public member: Member,
		public locale: string,
		public id: string,
		public guildLocale: string,
		public guild: Guild,
		public data: SlashCommandData,
		public channel: Channel,
		client: Client
	) {
		super(client);
	}

	public async reply(content: string) {
		// const res =
		await fetch(`https://discord.com/api/v10/interactions/${this.id}/${this.token}/callback`, {
			method: 'POST',
			body: JSON.stringify({
				type: 4,
				data: {
					tts: false,
					content,
					embeds: [],
					allowed_mentions: { parse: [] }
				}
			}),
			headers: {
				Authorization: `Bot ${this.client.token}`,
				'Content-Type': 'application/json'
			}
		});

		// TODO: Return an interaction object back with the message and what not
		// if (res.ok) {
		// const apiMessage = (await res.json()) as APIMessage;
		// const channel = this.client.channels.get(apiMessage.channel_id);
		// const guild = this.client.guilds.get(apiMessage.guild_id);
		// const user = new User(apiMessage.author.id, apiMessage.author.username, apiMessage.author.discriminator, apiMessage.author.bot);
		// if (!channel) throw new Error('Channel not found');
		// if (!guild) throw new Error('Guild not found');
		// if (!user) throw new Error('User not found');
		// return new Message(apiMessage.id, apiMessage.content, guild, channel, user, this.client, this.id);
		return null;
		// }

		// const json = await res.json();
		// log({ state: 'DEBUG', json: JSON.stringify(json) });

		// throw new Error(`${res.status} ${res.statusText}`);
	}
}
