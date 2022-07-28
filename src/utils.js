import md5 from 'md5';
/*
	String variable used for cache name
	values: V1 | V2 | anything
*/
export const CACHE_NAME = 'V1';

/*
	Boolean variable to toggle progressive web app features
*/
export const PWA = true;

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
	If user is online, fetch call will check db (or other location) for user creds
	If there is a server error, catch block will execute and local storage hash token will be checked
	If user is offline, local storage hash token is checked
	If the userHash exists and matches the entered username & password, user is allowed in
	Else, user is not allowed in

	*** Only one user hash is currently stored. Value is that of the latest user authed in only  ***
	*** Logic may need to be extended to support multiple user hashes, expiration, deletion, etc ***
*/
export async function authUser(username, password) {
	//create user hash of username, password and salt
	const userHash = md5(username + password + SALT);
	let validUser = false;

	if (navigator.onLine) {
		//if user is online, check db or other location for user creds
		validUser = await fetch('/users.json')
			.then(response => response.json())
			.then(userData => {
				const user = userData.filter(u => u.username === username && u.password === password)[0];
				if (user) {
					console.log("[AuthUser] Login via fetch call. Set hash token");
					localStorage.setItem(LS_PREFIX+'authUser', true);
					localStorage.setItem(LS_PREFIX+'userHash', userHash);
					return true;
				} else {
					return false;
				}
			}).catch(err => {
				//if server error occurs, check local storage hash token
				console.log("[AuthUser] Fetch users error", err);

				//if here, user may be offline. check username and password against local storage userHash
				const storedUserHash = localStorage.getItem(LS_PREFIX+'userHash');
				console.log("[AuthUser] checking user hash, storedUserHash: "+storedUserHash+", userHash: "+userHash);
				if (storedUserHash && storedUserHash === userHash) {
					console.log("[AuthUser] Login via hash token");
					return true;
				} else {
					//user hash not found or some other error
					console.log("[AuthUser] Unable to login online");
					return false;
				}
			});
	} else {
		//if here, user is offline. check username and password against local storage userHash
		console.log("[AuthUser] User is in offline mode, checking user hash...");
		const storedUserHash = localStorage.getItem(LS_PREFIX+'userHash');
		console.log("[AuthUser] storedUserHash: "+storedUserHash+", userHash: "+userHash);
		if (storedUserHash && storedUserHash === userHash) {
			console.log("[AuthUser] User auth via hash token");
			validUser = true;
		} else {
			//user hash not found or some other error
			console.log("[AuthUser] Unable to login offline");
			validUser = false;
		}
	}

	return validUser;
}
