<script lang="ts">
	import { ActivityType } from '$lib/Constants';
	import type { MemberInformation } from '$lib/MemberInformation';

	export let member: MemberInformation;
</script>

<div class="member-status">
	<div class="member-name">{member.name}</div>
	<div>|</div>
	<div class="member-action">
		<div class="member-activity">
			{#if member.activityType === ActivityType.GAME}Playing {member.activity}{/if}
			{#if member.activityType === ActivityType.CUSTOM}{member.activity}{/if}
		</div>
		{#if member.channel !== ''}
			<div class="member-voice-channel">In voice channel {member.channel}</div>
		{/if}
	</div>
</div>

<style>
    .member-action {
        display: flex;
        flex-direction: column;
    }

    .member-status {
        align-items: center;
        display: flex;
    }

    .member-name {
        padding-right: var(--spacing);
        text-align: right;
        width: 8rem;
    }

    .member-voice-channel {
        color: var(--color-maroon);
        font-style: italic;
        text-decoration-line: blink;
    }
</style>