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


## Local testing on mobile device

To test locally on a mobile device go to the localhost IP address in a browser on a mobile device.
The localhost IP address should be displayed in the terminal window where your run 'npm start'.
It should be something like "On Your Network:  http://192.168.1.189:3000"
You must also be on the same WIFI network on your mobile device as the machine where your localhost is running.

For service workers to work correctly, a site must be sent over https.  localhost:3000 is an exception as service workers do function correctly at a 'localhost' url.  However accessing a localhost url via IP address is served up over http.  Therefore, service workers are not made available in a mobile browser.

To work around this in Chrome, you can enable the flag:
chrome://flags/#unsafely-treat-insecure-origin-as-secure
Add your localhost IP address and port to the allowed urls, save and relaunch the browser.
Service workers should now work properly for your localhost site.