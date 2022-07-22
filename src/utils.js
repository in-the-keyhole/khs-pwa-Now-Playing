import md5 from 'md5';
/*
	String variable used for cache name
	values: V1 | V2 | anything
*/
export const CACHE_NAME = 'V1';

/*
	Boolean variable to toggle progressive web app features
*/
export const PWA = 1;

/*
	String variable to use call json file or graphql service for api calls
	values: JSON | GQL
*/
export const QUERY_TYPE = 'GQL';	// JSON | GQL

/*
	String variable used for local storage prefix of all key:value pairs
*/
export const LS_PREFIX = 'PWA_nowPlaying_';

/*
 String variable used to salt an md5 string.  Probably should be stored in a more secure place. Here for quick development.
*/
export const SALT = 'ppAgnIyalPwOneloHyeK';

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

/*
	Simple login function to check user creds against db (or in this case, json file)
	If user is offline, fetch call will error out and fall thru the catch function
	In the catch, user creds are checked against local storage userHash
	If the userHash exists and matches the entered username & password, user is allowed in
	Else, user is not allowed in

	*** Only one user hash is currently stored. Value is that of the latest user authed in only  ***
	*** Logic may need to be extended to support multiple user hashes, expiration, deletion, etc ***
*/
export async function authUser(username, password) {
	//create user hash of username, password and salt
	const userHash = md5(username + password + SALT);

	const validUser = await fetch('/users.json')
		.then(response => response.json())
		.then(userData => {
			const user = userData.filter(u => u.username === username && u.password === password)[0];
			if (user) {
				console.log("User auth via fetch call. Set hash token");
				localStorage.setItem(LS_PREFIX+'authUser', true);
				localStorage.setItem(LS_PREFIX+'userHash', userHash);
				return true;
			} else {
				return false;
			}
		}).catch(e => {
			console.log("Fetch users error", e);
			console.log("Login error, may be in offline mode, checking user hash...");

			//if here, user may be offline. check username and password against local storage userHash
			const storedUserHash = localStorage.getItem(LS_PREFIX+'userHash');
			console.log("storedUserHash: "+storedUserHash+", userHash: "+userHash);
			if (storedUserHash && storedUserHash === userHash) {
				console.log("User auth via hash token");
				return true;
			} else {
				//user hash not found or some other error
				return false;
			}
		});

	return validUser;
}
