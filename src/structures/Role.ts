import { Base } from '#structures/Base';
import type { Client } from '#client/Client';
import type { APIRole } from '#types/API';
import type { Guild } from '#structures/Guild';

export class Role extends Base {
	public id: string;
	public name: string;
	public color: number;
	public hoist: boolean;
	public managed: boolean;
	public icon?: string;
	public unicode_emoji?: string;
	public position: number;
	public permissions: string;
	public mentionable: boolean;

	public constructor(data: APIRole, public guild: Guild, client: Client) {
		super(client);

		this.id = data.id;
		this.name = data.name;
		this.hoist = data.hoist;
		this.color = data.color;
		this.position = data.position;
		this.managed = data.managed;
		this.permissions = data.permissions;
		this.mentionable = data.mentionable;
	}
}
