import type { APIGuildMember } from 'discord-api-types/v10';
import type { Client } from '../client';
import type { Guild } from './Guild';
import type { User } from './User';
import { Base } from './Base';

export class GuildMember extends Base {
	public readonly id = this.user.id;

	public nick = this.raw.nick;
	public avatar = this.raw.avatar;
	public roles = new Map(this.raw.roles.length ? this.raw.roles.map((rid: string) => [rid, this.guild.roles.get(rid)]) : []);

	public constructor(private raw: APIGuildMember, public user: User, public guild: Guild, client: Client) {
		super(client);
	}
}
