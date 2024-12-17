<script lang="ts">
	import type { MemberInformation } from '$lib/MemberInformation';

	export let member: MemberInformation;
</script>

<div class="member-tab">
	<!--	<p style="width: 100%; text-align: center;">-->
	<!--		{#if status === "online"}💡{:else}✖️{/if}-->
	<!--	</p>-->
	<img alt="Avatar" src={member.avatar} />
	<!--	<div>{userName}</div>-->
	<!--	<div>{status}</div>-->
	<!--	<div>{activities}</div>-->
</div>

<style>
    .member-tab {
        display: flex;
        flex-direction: column;
        overflow-wrap: break-word;
        /*padding: 0.25%;*/
        /*width: 100%;*/
    }

    .member-tab img {
        border-radius: 50%;
    }
</style>

