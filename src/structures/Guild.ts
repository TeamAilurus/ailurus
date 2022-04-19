import type { Client } from '#client/Client';
import { Base } from '#structures/Base';
import { Role } from '#structures/Role';
import { Channel } from '#structures/Channel';
import type { APIGuild } from '#types/API';

export class Guild extends Base {
	public id: string;
	public name: string;
	public roles: Map<string, Role>;
	public channels: Map<string, Channel>;

	public constructor(public data: APIGuild, client: Client) {
		super(client);

		this.id = data.id;
		this.name = data.name;
		this.roles = new Map(data.roles.map((r: any) => [r.id, new Role(r, this, client)]));
		this.channels = new Map(data.channels.map((chan: any) => [chan.id, new Channel(chan, this, client)]));
	}
}
