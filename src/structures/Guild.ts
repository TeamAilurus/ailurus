import type { Client } from '#client/Client';
import { Base } from '#structures/Base';

export class Guild extends Base {
	public constructor(public id: string, public name: string, client: Client) {
		super(client);
	}
}
