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


if ("serviceWorker" in navigator) {
	if (PWA) {
		//vars can be passed to sw.js via search params
		window.addEventListener("load", function() {
			navigator.serviceWorker
				.register("/sw.js?pwa="+PWA+"&cache_name="+CACHE_NAME)
				.then(res => console.log("[Service Worker] Registered"))
				.catch(err => console.log("[Service Worker] not registered", err))
		});
	} else {
		console.log("Not running as PWA");
		navigator.serviceWorker.getRegistrations().then(regs => {
    	regs.forEach(reg => {
    		console.log("[Service Worker] unregistering", reg);
    		reg.unregister();	
    	});
    }).catch(function(err) {
			console.log("[Service Worker] unregistration failed: ", err);
    });
  }
}