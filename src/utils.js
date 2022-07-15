/*
	String variable to use call json file or graphql service for api calls
	values: JSON | GQL
*/
export const QUERY_TYPE = 'GQL';	// JSON | GQL

/*
	Boolean variable to toggle progressive web app features
*/
export const PWA = 1;

/*
	String variable used for cache name
	values: V1 | V2 | anything
*/
export const CACHE_NAME = 'V1';

/*
	String variable used for local storage prefix of all key:value pairs
*/
export const LS_PREFIX = 'PWA_nowPlaying_';

// Wrapper to support first and second origin trial
// See https://web.dev/badging-api/ for details.
export function setBadge(value) {
	if (isNaN(value)) {
		value = 0;
	}
	if (value) {
		if (navigator.setAppBadge) {
			navigator.setAppBadge(value);
		} else if (navigator.setExperimentalAppBadge) {
			navigator.setExperimentalAppBadge(value);
		} else if (window.ExperimentalBadge) {
			window.ExperimentalBadge.set(value);
		}
	} else {
		clearBadge();
	}
}


function clearBadge() {
	if (navigator.clearAppBadge) {
		navigator.clearAppBadge();
	} else if (navigator.clearExperimentalAppBadge) {
		navigator.clearExperimentalAppBadge();
	} else if (window.ExperimentalBadge) {
		window.ExperimentalBadge.clear();
	}
}

export function badgeSupport() {
	const badgeSupport = document.getElementById('badgingVersion').value;
	return badgeSupport != null ? true : false;
}

export function getBrowser() {
	const agent = window.navigator.userAgent.toLowerCase();
	switch (true) {
		case agent.includes("iphone"): return "Iphone";
		case agent.includes("android") && agent.includes("chrome"): return "Android Chrome";
		case agent.includes("edge"): return "Edge";
		case agent.includes("edg/"): return "Edge";
		case agent.includes("opr") && !!window.opr: return "Opera";
		case agent.includes("chrome") && !!window.chrome: return "Chrome";
		case agent.includes("trident"): return "MSIE";
		case agent.includes("firefox"): return "Firefox";
		case agent.includes("safari"): return "Safari";
		default: return "other";
	}
}
