import type Client from '#client/Client';

export default class Base {
	public constructor(public client: Client) {
		Object.defineProperty(this, 'client', { value: client });
	}
}
