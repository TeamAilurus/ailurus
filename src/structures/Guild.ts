import type { Client } from 'client';
import type { APIGuild, Snowflake } from 'discord-api-types/v10';
import { Base } from './Base';
import { Channel } from './Channel';

export class Guild extends Base {
	public readonly id: Snowflake = this.data.id;
	public name: string = this.data.name;
	public channels: Map<string, Channel>;

	public constructor(public data: APIGuild, client: Client) {
		super(client);
		this.channels = new Map(data.channels ? data.channels.map((chan: any) => [chan.id, new Channel(chan, this, client)]) : []);
	}
}
