//exact copy of full example code from (https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Push notification server running! <hr />'));

const dummyDb = { subscription: null }; //dummy in memory store
const saveToDatabase = async subscription => {
	// Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
	// Here you should be writing your db logic to save it.
	dummyDb.subscription = subscription;
}

// The new /save-subscription endpoint
app.post('/register', async (req, res) => {
	console.log("Received registration request", req.body);
	console.log("\n");
	const subscription = req.body;
	await saveToDatabase(subscription); //Method to save the subscription to Database
	res.json({ action: 'success' });
})
const vapidKeys = {
	publicKey: 'BIkUaEYLnbHdTXJPnXJwHe16IFUQLZHvQvw2EyIfEqpm8sAROFqtkG4pes_0JPyU8LUuODXIJ3KoUR9gLdYrvl0',
	privateKey: 'et-k3Un3PEbEwmypdX4cdzEARhU8f30w9YPXKwQMoZc'
};

//setting our previously generated VAPID keys
webpush.setVapidDetails(
	'mailto:myuserid@email.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
);

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend) => {
	webpush.sendNotification(subscription, dataToSend);
}

//route to test send notification
app.get('/send-notification', (req, res) => {
	//console.log("REQ url", req.url);
	//console.log("REQ params", req.params);
	const message = req.query && req.query.m ? req.query.m : "KH NP Notification";
	console.log("Sending push notification message:", message);
	console.log("\n");
	const subscription = dummyDb.subscription; //get subscription from your database here.

	sendNotification(subscription, message);
	res.json({ action: 'Push message sent', message: message });
});

app.listen(port, () => console.log(`\nPush notification server listening on port ${port}\n`));
