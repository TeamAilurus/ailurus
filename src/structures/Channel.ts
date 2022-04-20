import type { Client } from 'client';
import type { APIChannel } from 'discord-api-types/v10';
import { Base } from './Base';
import type { Guild } from './Guild';

export class Channel extends Base {
	public readonly id = this.raw.id;

	public constructor(private raw: APIChannel, public guild: Guild, client: Client) {
		super(client);
	}
}
