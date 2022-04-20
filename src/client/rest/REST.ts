import { fetch } from 'undici';
import { RequestMethod } from '../../types/lib';
import type { Client } from '../Client';

export class REST {
	public API_URL = 'https://discord.com/api/v10';
	public constructor(private client: Client) {}

	public async get(path: string, body: any) {
		return this.request(path, body, RequestMethod.Get);
	}

	public async delete(path: string, body: any) {
		return this.request(path, body, RequestMethod.Delete);
	}

	public async post(path: string, body: any) {
		return this.request(path, body, RequestMethod.Post);
	}

	public async put(path: string, body: any) {
		return this.request(path, body, RequestMethod.Put);
	}

	public async patch(path: string, body: any) {
		return this.request(path, body, RequestMethod.Patch);
	}

	private async request(path: string, body: any, method: RequestMethod) {
		return fetch(`${this.API_URL}${path}`, {
			method,
			body,
			headers: {
				Authorization: `Bot ${this.client.token}`,
				'Content-Type': 'application/json'
			}
		});
	}
}
