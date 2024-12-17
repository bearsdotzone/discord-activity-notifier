// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { MemberInformation } from '$lib/MemberInformation';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			members: MemberInformation[];
		}

		// interface PageState {}
		// interface Platform {}
	}
}

export {};
