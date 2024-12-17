<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';
	import MemberIcon from '$lib/MemberIcon.svelte';
	import { DefaultMember, type MemberInformation, TestMembers } from '$lib/MemberInformation';
	import MemberStatus from '$lib/MemberActivity.svelte';
	import {
		activityListAnimationFrequencyMs, animateActivityList, animateServerMemberList,
		discordPollingFrequencyMs,
		memberIconScrollAnimationFrequencyMs
	} from '$lib/Config';
	import { popTop } from '$lib/Animations';
	import { flip } from 'svelte/animate';
	import MemberActivity from '$lib/MemberActivity.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	// let data = { members: TestMembers };

	const memberList = $derived(data.members as MemberInformation[]);

	const membersWithAnActivity = $derived(memberList.filter((x) => x.activity !== ''));
	let memberActivityEntries: MemberInformation[] = $state([]);

	let memberIconEntries: MemberInformation[] = $state([]);

	onMount(() => {
		const discordPollingInterval = setInterval(() => {
			invalidateAll();
			// Set GPIO here
		}, discordPollingFrequencyMs);

		const activityListAnimatingInterval = setInterval(() => {
			if (!membersWithAnActivity.every((i) => memberActivityEntries.some((j) => j.id === i.id))
				|| !memberActivityEntries.every((i) => membersWithAnActivity.some((j) => j.id === i.id))) {
				memberActivityEntries = membersWithAnActivity;
			}
			if (memberActivityEntries.length > 0 && animateActivityList)
				memberActivityEntries.push(memberActivityEntries.shift() ?? DefaultMember);
		}, activityListAnimationFrequencyMs);

		const memberIconAnimatingInterval = setInterval(() => {
			if (memberIconEntries.length === 0)
				memberIconEntries = memberList;
			if (memberList.length > 10 && animateServerMemberList)
				memberIconEntries.push(memberIconEntries.shift() ?? DefaultMember);
		}, memberIconScrollAnimationFrequencyMs);

		return () => {
			clearInterval(activityListAnimatingInterval);
			clearInterval(discordPollingInterval);
			clearInterval(memberIconAnimatingInterval);
		};
	});
</script>

<div class="member-bar">
	{#each memberIconEntries as member (member)}
		<div style="width: 9.5%; padding: 0.25%" animate:flip>
			<MemberIcon {member} />
		</div>
	{/each}
</div>
<div class="activity-list">
	{#if memberActivityEntries.length > 0}
		<ul>
			{#each memberActivityEntries as member (member)}
				<li animate:popTop={{entriesLength: memberActivityEntries.length}}>
					<MemberActivity {member}></MemberActivity>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="empty-activity-list">
			<p style="color: var(--color-overlay0);">No activities at the moment</p>
		</div>
	{/if}
</div>

<style>
    .activity-list {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center;
        overflow: clip;
        width: 100%;
    }

    .empty-activity-list {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .member-bar {
        display: flex;
        width: 100%;
    }

    li {
        background-color: var(--color-surface2);
        border-radius: var(--spacing);
        display: flex;
        flex-direction: column;
        height: 10vh;
        justify-content: center;
        list-style: none;
        margin: var(--spacing) 0;
        padding: var(--spacing);
    }

    ul {
        margin: 0;
        padding-left: 0;
    }

</style>
