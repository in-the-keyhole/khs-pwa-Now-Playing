import React from "react";
import ReactDOM from "react-dom/client";
import ClientProvider from "./ClientProvider";
import App from "./App";
import { PWA, CACHE_NAME } from "./config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ClientProvider>
		<App />
	</ClientProvider>
);

const installDiv = document.getElementById('installContainer');
const installBtn = document.getElementById('installBtn');
const cancelBtn = document.getElementById('cancelBtn');
window.addEventListener('beforeinstallprompt', (event) => {
	// Prevent the mini-infobar from appearing on mobile.
	event.preventDefault();
	console.log('beforeinstallprompt', event);
	// Stash the event so it can be triggered later.
	window.deferredPrompt = event;
	// Remove the 'hidden' class from the install button container.
	installDiv.classList.toggle('hidden', false);
});

window.addEventListener('appinstalled', (event) => {
  console.log('appinstalled, clear deferredPrompt', event);
  // Clear the deferredPrompt so it can be garbage collected
  window.deferredPrompt = null;
});

//window.history.replaceState( {}, "", "" );

installBtn.addEventListener('click', async () => {
	console.log('installBtn-clicked');
	const promptEvent = window.deferredPrompt;
	if (!promptEvent) {
		alert("Install prompt not available. Is app already installed?");
		// The deferred prompt isn't available.
		window.deferredPrompt = null;
		return;
	}
	// Show the install prompt.
	promptEvent.prompt();
	// Log the result
	const result = await promptEvent.userChoice;
	console.log('userChoice', result);
	// Reset the deferred prompt variable, since
	// prompt() can only be called once.
	window.deferredPrompt = null;
	// Hide the install button.
	installDiv.classList.toggle('hidden', true);
});

cancelBtn.addEventListener('click', async () => {
	console.log('cancelBtn-clicked');
	installDiv.classList.toggle('hidden', true);
});


if ("serviceWorker" in navigator) {
	if (PWA) {
		//vars can be passed to sw.js via search params
		window.addEventListener("load", function() {
			navigator.serviceWorker
				//.register("/sw.js?pwa="+PWA+"&cache_name="+CACHE_NAME)
				.register("/sw.js")
				.then(res => console.log("[Service Worker] Registered"))
				.catch(err => console.log("[Service Worker] not registered", err))
		});
	} else {
		console.log("Not running as PWA");
		//delete all localStorage items prefixed with 'PWA_nowPlaying_'
		Object.keys(localStorage).forEach(function(key){
			if (key.startsWith('PWA_nowPlaying_')) {
				localStorage.removeItem(key);
			}
		});
		navigator.serviceWorker.getRegistrations().then(regs => {
			regs.forEach(reg => {
				console.log("[Service Worker] unregistering", reg);
				reg.unregister();	
			});
		}).catch(function(err) {
			console.log("[Service Worker] unregistration failed: ", err);
		});
	}
} else {
	alert("Service worker not available in browser. Connection must be over https.");
}