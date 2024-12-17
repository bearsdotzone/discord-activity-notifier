import { ActivityType } from '$lib/Constants';

export type MemberInformation = {
	id: string;
	// server username or global username
	name: string;
	// url for avatar
	avatar: string;
	// online, idle, etc.
	status: string;
	// GAME, STREAMING, LISTENING, etc...
	activityType: ActivityType | null;
	// Description of activity
	activity: string;
	// voice channel name
	channel: string;
};

export const DefaultMember: MemberInformation = {
	id: 'placeholder',
	name: 'placeholder',
	avatar: 'https://cdn.discordapp.com/embed/avatars/0.png?size=128',
	status: 'placeholder',
	activityType: ActivityType.GAME,
	activity: 'Minecraft',
	channel: ''
};

export const TestMembers: MemberInformation[] = [
	{ ...DefaultMember, channel: 'BURRS' },
	DefaultMember,
	DefaultMember,
	{
		...DefaultMember,
		activity: '',
		avatar: `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png?size=128`
	},
	{
		...DefaultMember,
		activity: '',
		avatar: `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png?size=128`
	},
	{
		...DefaultMember,
		activity: '',
		avatar: `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png?size=128`
	},
	{
		...DefaultMember,
		activity: '',
		avatar: `https://cdn.discordapp.com/embed/avatars/${Math.floor(Math.random() * 6)}.png?size=128`
	},
	{ ...DefaultMember },
	{ ...DefaultMember },
	{ ...DefaultMember },
	{ ...DefaultMember, activity: '' }
];
