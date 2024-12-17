import type { RequestHandler } from './$types';
import type { MemberInformation } from '$lib/MemberInformation';
import dotenv from 'dotenv';
import Eris from 'eris';
import { json } from '@sveltejs/kit';
import {
	animatedProfilePicturesAnimate,
	filterBots,
	filteredActivities,
	filteredUsers,
	guildToScan
} from '$lib/Config';

let memberNames: MemberInformation[] = [];
dotenv.config();

const bot = Eris(process.env.TOKEN ?? '', {
	intents: ['guilds', 'guildPresences', 'guildMembers'],
	restMode: true
});

bot.on('ready', async () => {
	updateNames();
});

bot.on('presenceUpdate', async () => {
	updateNames();
});
bot.connect();

function updateNames() {
	memberNames = [];

	const members = bot.guilds.get(guildToScan ?? '')?.members;

	members
		?.filter((member) => !filteredUsers.includes(member.id))
		.forEach((member) => {
			if ((!filterBots && member.bot) || !member.bot) {
				const memberName = member.nick ?? member.globalName ?? member.username;

				const memberAvatar = animatedProfilePicturesAnimate
					? (member.avatarURL ?? 'https://cdn.discordapp.com/embed/avatars/0.png?size=128')
					: (member.avatarURL.replace('gif', 'png') ??
						'https://cdn.discordapp.com/embed/avatars/0.png?size=128');

				const memberStatus = member.status?.toString() ?? '';

				const memberActivity =
					member.activities?.find((activity) => !filteredActivities.includes(activity.type)) ??
					null;
				const memberActivityType = memberActivity ? memberActivity.type : null;
				const memberActivityString = memberActivity ? memberActivity.name : '';

				const memberChannelID = member.voiceState.channelID ?? '';
				const memberChannelString =
					bot.guilds.get(guildToScan ?? '')?.channels.get(String(memberChannelID))?.name ?? '';

				memberNames.push({
					id: member.id,
					name: memberName,
					avatar: memberAvatar,
					status: memberStatus,
					activityType: memberActivityType,
					activity: memberActivityString,
					channel: memberChannelString
				});
			}
		});
}

export const GET: RequestHandler = ({ url }) => {
	return json(memberNames);
};
