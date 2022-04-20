import type { Client } from '#client/Client';
import { Base } from '#structures/Base';
import { Channel } from '#structures/Channel';
import type { APIGuild, Snowflake } from 'discord-api-types/v10';

export class Guild extends Base {
	public readonly id: Snowflake = this.data.id;
	public name: string = this.data.name;
	public channels: Map<string, Channel>;

	public constructor(public data: APIGuild, client: Client) {
		super(client);
		this.channels = new Map(data.channels ? data.channels.map((chan: any) => [chan.id, new Channel(chan, this, client)]) : []);
	}
}
