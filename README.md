## Example React PWA Application

This repository contains an example React application that displays movies currently at the theater. It was built solely as an example of using React and is not intended to be used beyond the learning experience. 

The project utilizes the [TMDb API](https://www.themoviedb.org/).

![Screenshot](screenshot.png)
<sup>Note: the image shown above is not owned by Keyhole, and all copyrights belong to their respective owners. The image used here is only for education and is not intended to generate income.</sup>

This content is from [Keyhole Software](https://keyholesoftware.com). We love knowledge transfer!

## Installation

Prerequisite: Node.js needs to be installed...

1. Clone project
2. npm install from a command shell
3. npm start from a command shell 
4. Browser should open on http://localhost:3000

## Progressive Web Application Functionality

This project is a test implementation of progressive web app capabilities.
1. Caching of assets for offline use
2. Ability to add app to home screen on mobile device
3. Add native mobile app functionality and usage to give user native app experience


## Local testing on desktop

Chrome is preferred browser when testing.  Firefox and Safari do work on desktop browser. However, to install a site as an app, a 'beforeinstallprompt' event has to fire.  That window event is not supported on Firefox or Safari.  https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeinstallprompt_event


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

## Clearing cache, local storage and service worker registration

Sometimes when manually testing the app, you will have to manually delete cache, local storage and the service worker to make sure all stale relics are gone.

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

