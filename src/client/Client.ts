import Gateway from '#client/ws/Gateway';
import type Guild from '#structures/Guild';
import getEnv from '#utils/getEnv';
import type { Channel } from 'diagnostics_channel';
import { EventEmitter } from 'stream';

export default class Client extends EventEmitter {
	public gateway: Gateway;
	public guilds = new Map<string, Guild>();
	public channels = new Map<string, Channel>();

	public constructor(public token: string = getEnv('DISCORD_TOKEN')) {
		super();
		this.gateway = new Gateway(token, this);
	}
}
