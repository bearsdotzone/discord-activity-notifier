import { ActivityType } from '$lib/Constants';

export const activityListAnimationDurationMs = 5_000;
export const activityListAnimationFrequencyMs = 10_000;

export const animateActivityList = true;
export const animateServerMemberList = true;

export const animatedProfilePicturesAnimate = false;

export const discordPollingFrequencyMs = 5_000;

export const filterBots = true;

export const filteredUsers = [
	'176979262039916544', //Bearbot5000
	'834932540770746448', //fake_colby
	'187446571049287680', //karbon's pracy alt
	'226089704771158026' //renn2
];

// Ignore the custom status activity
export const filteredActivities: ActivityType[] = [ActivityType.CUSTOM];
// export const filteredActivities: ActivityType[] = [];

export const guildToScan = '81483858070999040';

export const memberIconScrollAnimationFrequencyMs = 15_000;
export const memberIconScrollAnimationDurationMs = 5_000;
