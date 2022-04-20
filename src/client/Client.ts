import { env } from 'node:process';
import { EventEmitter } from 'stream';
import type { Channel, Guild } from '../structures';
import { Gateway } from './ws/Gateway';
import type { ClientOptions } from '../types/lib';

export class Client extends EventEmitter {
	public gateway: Gateway;
	public token = env.DISCORD_TOKEN as string;
	public intents: number;
	public guilds = new Map<string, Guild>();
	public channels = new Map<string, Channel>();

	public constructor(options: ClientOptions) {
		super();
		this.intents = options.intents || 0;
		this.gateway = new Gateway(this);
	}

	public login(token?: string) {
		this.gateway._init((token ??= this.token));
	}
}
