import type { APIRole, Snowflake } from 'discord-api-types/v10';
import type { Client } from '../client';
import { Base } from './Base';

export class Role extends Base {
	public readonly id: Snowflake = this.raw.id;
	public name: string = this.raw.name;

	public constructor(private raw: APIRole, client: Client) {
		super(client);
	}
}
