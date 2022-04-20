import type { APIGuild, APIRole, Snowflake } from 'discord-api-types/v10';
import type { Client } from '../client';
import { Base } from './Base';
import { Channel } from './Channel';
import { Role } from './Role';

export class Guild extends Base {
	public readonly id: Snowflake = this.data.id;
	public name: string = this.data.name;
	public channels: Map<string, Channel>;
	public roles: Map<string, Role>;

	public constructor(public data: APIGuild, client: Client) {
		super(client);
		this.channels = new Map(data.channels ? data.channels.map((chan: any) => [chan.id, new Channel(chan, this, client)]) : []);
		this.roles = new Map(data.roles ? data.roles.map((role: APIRole) => [role.id, new Role(role, this.client)]) : []);
	}
}
