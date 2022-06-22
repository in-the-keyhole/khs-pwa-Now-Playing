import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './index.css'

const element = <App />
ReactDOM.render(element, document.getElementById('root'));

const PWA = 0;
if ("serviceWorker" in navigator && PWA) {
	window.addEventListener("load", function() {
		navigator.serviceWorker
			.register("/sw.js")
			.then(res => console.log("[Service Worker] Registered"))
			.catch(err => console.log("[Service Worker] not registered", err))
	})
} else {
	console.log("Not running as PWA");
}