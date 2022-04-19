import { Gateway } from '#client/ws/Gateway';
import type { Guild } from '#structures/Guild';
import type { Channel } from '#structures/Channel';
import { EventEmitter } from 'stream';
import type { ClientOptions } from '../types/LIB';

export class Client extends EventEmitter {
	public gateway: Gateway;
	public token = process.env.DISCORD_TOKEN as string;
	public guilds = new Map<string, Guild>();
	public channels = new Map<string, Channel>();

	public constructor(options?: ClientOptions) {
		super();
		this.gateway = new Gateway(options?.token ?? this.token, this);
	}
}
