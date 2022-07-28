## Example React PWA Application

This repository contains an example React application that displays movies currently at the theater. It was built solely as an example of using React and is not intended to be used beyond the learning experience. 

The project utilizes the [TMDb API](https://www.themoviedb.org/).

![Screenshot](screenshot.png)
<sup>Note: the image shown above is not owned by Keyhole, and all copyrights belong to their respective owners. The image used here is only for education and is not intended to generate income.</sup>

This content is from [Keyhole Software](https://keyholesoftware.com). We love knowledge transfer!

## Installation

Prerequisite: Node.js needs to be installed...

1. Clone project
2. From a terminal window, change directory to your project folder
2. Run `npm install`
3. Run `npm start`
4. Browser should open on http://localhost:3000

Daily workflow

Run `npm start` in a terminal window from your project folder. Open http://localhost:3000 in a browser.


## Progressive Web Application Functionality

This project is a test implementation of progressive web app capabilities.
1. Caching of assets for offline use
2. Ability to add app to home screen on mobile device
3. Add native mobile app functionality and usage to give user native app experience

For a website to be a Progressive Web App it must have a manifest file and a service worker implemented.

The manifest file is a json file containing key value pairs that allow a website to be installed on a device with the look and feel of a native app. When a PWA is installed on a device, an app icon is added with a short name, a splash screen is presented when the app loads and the app displays in one of four modes (standalone, fullscreen, minimal-ui and browser). The icon, name, loading image, display mode and some other attributes are all defined in the manifest file. For more info see https://developer.mozilla.org/en-US/docs/Web/Manifest

A service worker is a utility that allows most progressive web app features to be implemented. Features such as caching of assets, push notifications and offline mode require a service worker. For more info see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API


## Logging in

The landing page for the Now Playing app is a login page. The login system is not wired to a database in order to keep things quick and simple. A hardcoded local file contains the username and passwords in a local json file in 'public/users.json'. Any username/password combo can be added to the list.

The default usernames and passwords are:
1. a/a
2. s/s
3. d/d
4. f/f


## Local testing on desktop

Chrome is the preferred browser when testing. Firefox and Safari do work on desktop browser. However, to install a site as an app, a 'beforeinstallprompt' event has to fire.  That window event is not supported on Firefox or Safari.  https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event

The 'beforeinstallprompt' event fires from the login page of the site. In Chrome a prompt is displayed allowing the user to download the site as an app or cancel. When 'Cancel' is clicked, a local storage variable (declineAppDownload) is set which will disallow the prompt from showing again. That local storage variable will have to be cleared in order for the 'beforeinstallprompt' to be fired again. To clear the local storage variable, see the 'Clearing cache, local storage' section of this document. Also, the 'beforeinstallprompt' will not fire if the app is installed on the device.


## Local testing on mobile device

To test locally on a mobile device go to the localhost IP address in a browser on a mobile device.
The localhost IP address should be displayed in the terminal window where your run 'npm start'.
You should see something like "On Your Network:  http://192.168.1.189:3000"
You must also be on the same WIFI network on your mobile device as the machine where your localhost is running.

For service workers to work correctly, a site must be sent over https.  localhost:3000 is an exception as service workers do function correctly at a 'localhost' url.  However accessing a localhost url via IP address is served up over http.  Therefore, service workers are not made available in a mobile browser.

To work around this in Chrome, you can enable the flag:
chrome://flags/#unsafely-treat-insecure-origin-as-secure
Add your localhost IP address and port to the allowed urls, save and relaunch the browser.
Service workers should now work properly for your localhost site.


## Site Utils and Configuration

In /src/utils.js are some global functions and variables used throughout the Now Playing App.

The `LS_PREFIX` variable (local storage prefix) is a string variable that is used as a prefix for all local storage variables.

The `CACHE_NAME` variable is a string used by the service worker when naming the cache. It is strongly recommended that this variable be updated to a different value any time a code change is pushed up to the live site. This ensures that any old cache or stale assets are deleted by the app when it recognizes a new version.

The `PWA` variable is a boolean that toggles the service worker on or off for testing purposes.


## Clearing cache, local storage and service worker registration

Sometimes when manually testing the app, you will have to manually delete cache, local storage and the service worker to make sure all stale relics are gone.

** For convenience, a Reset feature is available in the app when logged in. To access, click on the menu in the upper right corner and click Reset. To manually clear cache, storage and service worker, follow the steps below.

To clear these items in Chrome open the Inspector panel and click on the Application tab.

Unregister service worker:
1. On the left side panel under Application click on Service Workers
2. For the "localhost:3000" click on "Unregister" on the right hand side.

Clear local storage:
1. On the left side panel under Storage expand the Local Storage menu.
2. Right click on "localhost:3000" and click on Clear

Clear cache:
1. On the left side panel under Cache expand the Cache Storage menu.
2. Right click on all "nowPlaying" items and click on Delete


## Live Site

The site is available over https via https://now-playing-pwa.keyhole.institute/
There you should be able to view the website on a mobile device. Once you have viewed the movie listing and a few movie detail pages you should be able to turn wifi off or go into airplane mode and still see the content that you have previously viewed.

On an Android device, you should see a prompt when going to the login page. The prompt allows you to download the site as an app. When the app is installed you should get an app icon that launches the app as a PWA when clicked on.

The install prompt is not allowed on IOS devices. To install as an app on an IOS device you will have to use the default 'Add to home screen' option from the browser menu.


## AWS Deploying

A live instance of the Now Playing site is deployed to https://now-playing-pwa.keyhole.institute/.

Deploying changes requires AWS CLI to be installed and secret keys to be set up.
Contact Jaime Niswonger (jniswonger@keyholesoftware.com) for more details and AWS access.

When changes are ready to be deployed to the live site follow the steps below.

1. Open a terminal window.
2. Run command `npm run build`
3. Run command `aws s3 sync build s3://now-playing-pwa.keyhole.institute`
4. Run command `aws cloudfront create-invalidation --distribution-id E1IM8DXOSVOD6W --paths "/*" --no-cli-pager`

** no smart quotes allowed in cli commands, only plain text quotes


## Push Notifications

Implementing push notifications is quite involved and faceted. For more documentation refer to this blog: https://blog.atulr.com/web-notifications/

Push notifications have been implemented but only works from localhost thus far. A separate push notification server will have to be set up for this to work properly in a live production environment.

The above blog explains the what and why in much more detail than will be documented here so only an overview will be included.

-- The following is an overview of the implementation for push notifications for the Now Playing site.

In `index.js` the service worker file (`sw.js`) is registered. The call to `register()` returns a promise with a registration object that can then be used. First, a check for Notifications is done. If Notifications are not supported on the device or the user has not allowed Notifications, the code execution halts and nothing more can be done. If Notifications are supported and allowed, subscribing and registering continue.

When subscribing to the push server, a public key is retrieved and passed along. See the above mentioned article for a better explanation of what the public key is and how to generate it. In this PWA, the public key is stored in a text file at /public/publickey. The public key is sent to the `registration.pushManager.subscribe` method. This method returns a promise with a subscription object that then needs to be registered and saved to a db on the push server.

The service worker (`sw.js`) has an event listener for a 'push' event. When a push event is received with a message, a notification call is executed and a notification should appear (again, if supported and allowed). Push notifications can be sent even when the Now Playing site is not opened in a browser or standalone app.

-- The following is an overview of the implementation for push notifications for the push server which is at a different server address than the Now Playing site.

In this codebase, the push notification server file is `push.js`. It can be in the same directory as the rest of the Now Playing app but it does not run at the same server address. `push.js` is run at http://localhost:4000. To run the push server, open a terminal window to the khs-pwa-now-playing directory and run `node push.js`. You can then view http://localhost:4000 in a browser and see a simple UI for the push server.

In `push.js`, the necessary modules are retrieved via require(). Some route handlers are set up to execute when various endpoints are hit, notably the default GET '/' which displays the simple UI in a browser when viewing localhost:4000. A POST to '/' displays the simple UI as well as sending the composed message and displaying a response.

A POST handler to '/register' is called by the Now Playing app. This handler should save the user subscription object to a database. This app currently only saves the subscription to runtime memory. In a live production app this database call would be made.

The public and private keys are used in push.js for the webpush module. The keys can be hardcoded directly in push.js or stored and retrieved via other methods.

Lastly, the push server listens on localhost:4000.

For a push notification to be received by the Now Playing app, both the app and push server must be running. The user must have notifications supported and allowed. The app must register and subscribe to the push server. You should see a 'Received registration request' console log in the terminal window where the push server is running when a user subscribes and registers to the push server. Now a push notification can be sent.

From http://localhost:4000 you should see a simple UI with the text 'Push notification server running', a textbox and a submit button. Enter a message and click 'Send'. You should see more console logs in the terminal window and a message in the UI. If everything is successful you should see the notification appear on the device.

A test push message can also be sent from the browser dev tools. With the Now Playing App open in a browser, open the browser tools panel, click on the 'Application' tab then 'Service Workers' on the left side. Enter a message in the 'Push' textbox and click the 'Push' button. You should see the push message in the console log and a notification should appear if enabled.


## App Badges

Setting and clearing of app badges (a number over the app icon in the taskbar) is implemented in the Now Playing app. However, the app badge only appears on desktop (Mac and Windows). App badge capabilities are supported in Chrome on Android but the badge does not appear for unknown reasons. IOS does not support app badges. For more info: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/setAppBadge#browser_compatibility


## Notifications

Notifications (not the same as Push Notifications) are implemented in the Now Playing app. However, notifications only seem to appear on desktop (Mac and Windows). Notifications are supported in Chrome on Android but notifications do not seem to appear with the current code base for unknown reasons. IOS does not support notifications.

When viewing the site for the first time upon logging in, you should see a prompt asking to allow notifications if on a device and browser that support notifications. Click 'Allow' to enable notifications. Clicking 'Cancel' will disallow notifications and you will not receive the prompt in future entries into the site. To reset permission, click on the icon the left of the url in the browser address bar then click on 'Reset permission'.

To send a notification:
1. Log into the app
2. Notifications must be allowed when prompted
3. If initially allowing notifications you will have to refresh the page
3. Click on the upper right menu
4. Click on 'Get Notif'. This item will only appear if notifications are supported on your device
5. On desktop, a notification should appear. On Android the 'Get Notif' link is present but a notification does not appear. The link is not present on IOS.

For more info: https://developer.mozilla.org/en-US/docs/Web/API/notification#browser_compatibility


## Other References

Documentation for building a progressive web app with a full feature set are all over the internet in more depth and description than can be added here. Below is a list of resources that better explain browser compatibility of features, how to implement those features, code examples, etc.

PWA Overview: https://web.dev/progressive-web-apps/

Build PWA from scratch: https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/

App Badging API Demo: https://badging-api.glitch.me/

PWA for IOS: https://www.netguru.com/blog/pwa-ios

Basic Service Worker Sample: https://googlechrome.github.io/samples/service-worker/basic/

Push Notification Guide: https://medium.com/@a7ul/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679

Starbucks PWA: https://app.starbucks.com/

Simple PWA Live Example: https://stampy.me/pwgen/






