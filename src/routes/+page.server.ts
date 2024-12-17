import { type MemberInformation } from '$lib/MemberInformation';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch('/api/get-members');
	const jsres = await res.json();
	const newList: MemberInformation[] = [];
	for (const member of jsres) {
		newList.push(member as MemberInformation);
	}
	return { members: newList };
};
