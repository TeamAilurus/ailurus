import type { Client } from 'client';

export class Base {
	public constructor(public client: Client) {
		Object.defineProperty(this, 'client', { value: client });
	}
}
