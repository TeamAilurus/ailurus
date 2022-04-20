import { env } from 'node:process';
import { EventEmitter } from 'stream';
import type { Channel, Guild } from 'structures';
import type { ClientOptions } from '../types/LIB';
import { Gateway } from './ws/Gateway';

export class Client extends EventEmitter {
	public gateway: Gateway;
	public token = env.DISCORD_TOKEN as string;
	public guilds = new Map<string, Guild>();
	public channels = new Map<string, Channel>();

	public constructor(options?: ClientOptions) {
		super();
		this.gateway = new Gateway(options?.token ?? this.token, this);
	}
}
