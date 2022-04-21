import { env } from 'node:process';
import { EventEmitter } from 'stream';
import type { Channel, Guild, User } from '../structures';
import type { ClientOptions, ClientEvents } from '../types/lib';
import { REST } from './rest/REST';
import { Gateway } from './ws/Gateway';

export class Client extends EventEmitter {
	public readonly gateway = new Gateway(this);
	public readonly rest = new REST(this);
	public readonly token = env.DISCORD_TOKEN as string;
	public readonly guilds = new Map<string, Guild>();
	public readonly channels = new Map<string, Channel>();
	public intents: number;

	public user?: User;

	public constructor(options: ClientOptions) {
		super();
		this.intents = options.intents || 0;
	}

	public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => any | PromiseLike<any>) {
		return super.on(event, listener as (...args: any[]) => any);
	}

	public login(token?: string) {
		this.gateway._init((token ??= this.token));
	}
}
