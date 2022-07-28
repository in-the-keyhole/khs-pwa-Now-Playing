const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());	//handle json requests from web app
app.use(bodyParser.urlencoded({	//handle POST request from push-ui
  extended: true
}));

//simple ui for easily composing and sending a push notification
const pushUiHtml = `
<h1>Push notification server running</h1>
<form method="post" action="/">
	<label for="message">
		Push Message:
		<input id="message" type="text" name="message" />
	</label>
	<button type="submit">Send</button>
</form>`;

const dummyDb = { subscription: null }; //dummy in memory store
const saveToDatabase = async subscription => {
	// Since this is a demo app, I am going to save this in a dummy in memory store. Do not do this in your apps.
	// Here you should be writing your db logic to save it.
	dummyDb.subscription = subscription;
};

//default view rendered when accessing localhost:4000 in browser, shows push ui
app.get('/', (req, res) => {
	res.send(pushUiHtml)
});

//handler for post request coming from push ui
app.post('/', (req, res) => {
	const message = req.body.message;
	console.log("Received message submit POST request, message: "+message);
	const result = sendNotification(message);
	res.send(pushUiHtml + "<h2>"+result+"</h2>");
});

//handler for post call to /register from PWA
app.post('/register', async (req, res) => {
	console.log("Received registration request", req.body);
	console.log("\n");
	const subscription = req.body;
	await saveToDatabase(subscription); //Method to save the subscription to Database
	res.json({ action: 'success' });
});


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
const sendNotification = (dataToSend) => {
	const message = dataToSend ? dataToSend : "KH NP Notification";
	const subscription = dummyDb.subscription; //get subscription from your database here.

	console.log("Sending push notification message:", message);
	if (subscription) {
		webpush.sendNotification(subscription, message);
		return 'Push message sent: '+ message;
	} else {
		return 'Push message not sent: Invalid subscription';
	}
}

//handler for route to test send notification via localhost:4000/send-notification?m={message}
app.get('/send-notification', (req, res) => {
	const message = req.query.m;
	console.log("Received send-notification GET request, message: "+message);
	const result = sendNotification(message);
	res.json({message: result});
});

app.listen(port, () => console.log(`\nPush notification server listening on port ${port}\n`));
