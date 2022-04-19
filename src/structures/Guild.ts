import type { Client } from '#client/Client';
import { Base } from '#structures/Base';
import { Channel } from '#structures/Channel';
import type { APIGuild } from '#types/API';

export class Guild extends Base {
	public id: string;
	public name: string;
	public channels: Map<string, Channel>;

	public constructor(public data: APIGuild, client: Client) {
		super(client);

		this.id = data.id;
		this.name = data.name;
		this.channels = new Map(data.channels.map((chan: any) => [chan.id, new Channel(chan, this, client)]));
	}
}
