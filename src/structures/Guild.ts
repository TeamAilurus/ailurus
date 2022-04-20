import type { APIGuild, APIRole, Snowflake } from 'discord-api-types/v10';
import type { Client } from '../client';
import { Base } from './Base';
import { Channel } from './Channel';
import { Role } from './Role';

export class Guild extends Base {
	public readonly id: Snowflake = this.raw.id;
	public name: string = this.raw.name;
	public channels: Map<string, Channel>;
	public roles: Map<string, Role>;

	public constructor(private raw: APIGuild, client: Client) {
		super(client);
		this.channels = new Map(raw.channels ? raw.channels.map((chan: any) => [chan.id, new Channel(chan, this, client)]) : []);
		this.roles = new Map(raw.roles ? raw.roles.map((role: APIRole) => [role.id, new Role(role, this.client)]) : []);
	}
}
