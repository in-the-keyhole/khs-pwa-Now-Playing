const webpush = require('web-push');

const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/dpps5DuF-gQ:APA91bGqu2MHDwlrujOVi07_3XSCIQJsouxDfNBpaLzV4YdZX2ZBvJFFNnSrrQQSUI8cHa6ufgfznmhjMO5X5xMSqOA4NrUEga79jAnAGITap0tDygadBcP1jvxHsCT89x20oFxrooxt',
  //endpoint: "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABi1…BbBlGi1pLSssAnd4g-Zbat7oakJT13T-YteRUi3K-ULOAl1vFdK0PW9Myybg",
  keys: {
    p256dh: 'BIkUaEYLnbHdTXJPnXJwHe16IFUQLZHvQvw2EyIfEqpm8sAROFqtkG4pes_0JPyU8LUuODXIJ3KoUR9gLdYrvl0',
    auth: 'authsecret123456asdfadfasdfasdf'
  }
};

const payload = 'here is a payload';

const options = {
  gcmAPIKey: 'abc123',
  vapidDetails: {
    subject: 'http://localhost:3000',
    publicKey: 'BIkUaEYLnbHdTXJPnXJwHe16IFUQLZHvQvw2EyIfEqpm8sAROFqtkG4pes_0JPyU8LUuODXIJ3KoUR9gLdYrvl0',
    privateKey: 'et-k3Un3PEbEwmypdX4cdzEARhU8f30w9YPXKwQMoZc'
  },
  timeout: 20000,
  TTL: 20000,
  //headers: {
  //  '< header name >': '< header value >'
  //},
  contentEncoding: 'aesgcm',
  //proxy: '< proxy server options >',
  //agent: '< https.Agent instance >'
}

console.log("send payload", payload);
webpush.sendNotification(
  pushSubscription,
  payload,
  options
);