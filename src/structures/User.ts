import type { APIUser } from 'discord-api-types/v10';

export class User {
	public readonly id = this.raw.id;

	public username = this.raw.username;
	public discriminator = this.raw.discriminator;

	public avatar = this.raw.avatar;
	public banner = this.raw.banner;

	public readonly bot = this.raw.bot;
	public verified = this.raw.verified;
	public readonly system = this.raw.system;

	public constructor(private raw: APIUser) {}
}
