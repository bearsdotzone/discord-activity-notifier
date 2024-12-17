import { activityListAnimationDurationMs } from '$lib/Config';
import { linear } from 'svelte/easing';

function popTopAnimationEasingFunction(x: number) {
	if (x < 0.33) return x * 1.5;
	if (x < 0.66) return 0.5;
	return 1.5 * (x - 0.3333);
}

export function popTop(
	node: HTMLElement,
	{ from, to }: { from: DOMRect; to: DOMRect },
	params: { entriesLength: number }
) {
	const duration = activityListAnimationDurationMs;

	const entryHeight =
		parseFloat(getComputedStyle(node).paddingTop) * 2 +
		parseFloat(getComputedStyle(node).marginTop) +
		parseFloat(getComputedStyle(node).height);

	if (from.top > to.top) {
		// Moving up
		return {
			delay: 0,
			duration: duration,
			easing: linear,
			tick: (t: number, u: number) => {
				Object.assign(node.style, { transform: `translateY(${u * entryHeight}px)` });
			}
		};
	} else {
		// Getting removed
		return {
			delay: 0,
			duration: duration,
			easing: popTopAnimationEasingFunction,
			// css: (t, u) => `transform: translateY(${u * 10}px);`,
			tick: (t: number, u: number) => {
				if (t < 0.5) {
					Object.assign(node.style, { opacity: 1 - t * 2 });
					Object.assign(node.style, {
						transform: `translateY(${-entryHeight * (params.entriesLength - 1) - entryHeight * t * 2}px)`
					});
				} else {
					Object.assign(node.style, { opacity: (t - 0.5) * 2 });
					Object.assign(node.style, {
						transform: `translateY(${entryHeight - entryHeight * (t - 0.5) * 2}px)`
					});
				}
			}
		};
	}
}
