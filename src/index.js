import React from "react";
import ReactDOM from 'react-dom/client';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	//useQuery,
	//gql
} from "@apollo/client";

const client = new ApolloClient({
	uri: "https://movies.keyhole.institute/graphql",
	cache: new InMemoryCache()
});

import App from './App'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);


/*
//Original app rendering
import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
*/

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