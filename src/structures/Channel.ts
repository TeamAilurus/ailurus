import type Client from '#client/Client';
import Base from '#structures/Base';
import type Guild from '#structures/Guild';

export default class Channel extends Base {
	public constructor(public id: string, public guild: Guild, public name: string, client: Client) {
		super(client);
	}
}
