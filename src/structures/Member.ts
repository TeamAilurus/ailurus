import type { User } from './User';

export class Member {
	public constructor(
		public roles: null,
		public premiumSince: string | null,
		public pending: boolean,
		public nick: string | null,
		public mute: boolean,
		public joinedAt: Date,
		public hoistedRole: string,
		public flags: number,
		public deaf: boolean,
		public communicationDisabledUntil: string | null,
		public avatar: string | null,
		public user: User | null
	) {}
}
