Running the App Locally
This app runs on Node.js. On its website you can find instructions on how to install it. You can also follow this https://nodejs.org/en/download/package-manager for a quick and easy way to install Node.js and npm.

Once installed, clone the repository and install its dependencies running: npm install. Using your own credentials
you will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to your Spotify for Developers Dashboard https://developer.spotify.com/ and create your application.

http://localhost:3000 (needed for the implicit grant flow)
http://localhost:3000/callback
Once you have created your app, load the client_id, redirect_uri and client_secret into a config.js file.

In order to run the app, open the folder, and run its server.js file first enter this in the terminal, npm run build, then node server.js. 

Then, open http://localhost:3000 in a browser.
