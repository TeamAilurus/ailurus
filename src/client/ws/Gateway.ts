import { Channel } from '#structures/Channel';
import { SlashCommandInteraction } from '#structures/CommandInteraction';
import { Guild } from '#structures/Guild';
import { Member } from '#structures/Member';
import { Message } from '#structures/Message';
import { User } from '#structures/User';
import { log } from '#utils/logger';
import { WebSocket } from 'ws';
import type { APIChannel, APIGuild, APIMessage, ReadyGuild, ReadyPayload, SlashCommand } from '../../types';
import type { Client } from '../Client';

export class Gateway {
	private HEARTBEAT_INTERVAL = 0;
	private lastSequence: number | undefined;
	private lastHeartbeat = 0;

	private readyGuilds: ReadyGuild[] = [];

	private socket = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');

	public constructor(private token: string, private client: Client) {
		this._init();
	}

	private _init() {
		this.socket.addEventListener('open', () => {
			log({ state: 'WS', message: 'Connected to API' });
		});

		this.socket.addEventListener('message', (message) => {
			const buffer = JSON.parse((message.data as string | Buffer | Buffer[]).toString());
			log({ state: 'WS', json: buffer });

			if (buffer.s) this.lastSequence = buffer.s;

			if (this.HEARTBEAT_INTERVAL === 0 && buffer.op === 10) {
				this.HEARTBEAT_INTERVAL = buffer.d.heartbeat_interval;

				log({ state: 'WS', message: `Sending a heartbeat every ${this.HEARTBEAT_INTERVAL}ms + jitter time` });
				log({ state: 'WS', message: 'Identifiying' });

				this.socket.send(
					JSON.stringify({
						op: 2,
						d: {
							token: this.token,
							intents: 513,
							properties: {
								$os: 'linux',
								$browser: 'Discord iOS',
								$device: 'ios'
							}
						}
					})
				);

				log({ state: 'WS', message: 'Identified' });

				return this.heartbeat();
			}

			if (buffer.op === 11) {
				log({ state: 'WS', message: `Heartbeat acknowledged in ${Date.now() - this.lastHeartbeat}ms` });
			}

			switch (buffer.op) {
				case 0: {
					switch (buffer.t) {
						case 'READY': {
							const readyPayload = buffer.d as ReadyPayload;
							this.readyGuilds = readyPayload.guilds;
							break;
						}
						case 'GUILD_CREATE': {
							const apiGuild = buffer.d as APIGuild;

							if (this.readyGuilds.length > 0) {
								const g = new Guild(apiGuild.id, apiGuild.name, this.client);
								this.client.guilds.set(g.id, g);

								apiGuild.channels.forEach((apiChannel: APIChannel) => {
									this.client.channels.set(apiChannel.id, new Channel(apiChannel.id, g, apiChannel.name, this.client));
								});

								this.readyGuilds = this.readyGuilds.filter((x) => x.id !== apiGuild.id);
								if (this.readyGuilds.length === 0) log({ state: 'WS', message: 'Guilds loaded' });
							}
							break;
						}
						// @ts-ignore shut the fuck up
						case 'MESSAGE_CREATE': {
							const apiMessage = buffer.d as APIMessage;

							const channel = this.client.channels.get(apiMessage.channel_id);
							const guild = this.client.guilds.get(apiMessage.guild_id);
							const user = new User(
								apiMessage.author.id,
								apiMessage.author.username,
								apiMessage.author.discriminator,
								apiMessage.author.bot
							);

							if (!channel || !guild) throw new Error('Channel or guild not found!');
							const message = new Message(apiMessage.id, apiMessage.content, guild, channel, user, this.client);
							this.client.emit('message', message);
						}
						case 'INTERACTION_CREATE': {
							const apiInteraction = buffer.d as SlashCommand;

							const channel = this.client.channels.get(apiInteraction.channel_id);
							const guild = this.client.guilds.get(apiInteraction.guild_id);

							const member = new Member(
								null, // Roles aren't implemented yet
								apiInteraction.member.premium_since,
								apiInteraction.member.pending,
								apiInteraction.member.nick,
								apiInteraction.member.mute,
								apiInteraction.member.joined_at,
								apiInteraction.member.hoisted_role,
								apiInteraction.member.flags,
								apiInteraction.member.deaf,
								apiInteraction.member.communication_disabled_until,
								apiInteraction.member.avatar,
								null // Fetch User here
							);

							if (!channel || !guild) throw new Error('Channel or guild not found!');
							const message = new SlashCommandInteraction(
								apiInteraction.token,
								member,
								apiInteraction.locale,
								apiInteraction.id,
								apiInteraction.guild_locale,
								guild,
								apiInteraction.data,
								channel,
								this.client
							);
							this.client.emit('slashCommand', message);
						}
					}
				}
			}
		});
	}

	private heartbeat() {
		setTimeout(() => {
			this.socket.send(
				JSON.stringify({
					op: 1,
					d: this.lastSequence
				})
			);

			log({ state: 'WS', message: 'Heartbeating' });
			this.lastHeartbeat = Date.now();

			this.heartbeat();
		}, this.HEARTBEAT_INTERVAL + Math.random());
	}
}
