# Creating collaborative apps in Pencil Spaces

This repo explains how you can build and host your first app in Pencil Spaces.

With our library, Mario, you can get started with building collaborative applications in Pencil Spaces in seconds. We'll take care of all the authentication and state synchronization!

## Getting access

To get started, you'll need to reach-out to us to be allow-listed as a developer.

To do this, please contact us at support@pencilspaces.com and ask to be added to our app developer community. Be sure to add a sentence or two about what you're planning to build - we'd love to learn more!

## Installing the Mario library

You can install the Mario library by running `npm i @pncl/mario` or `yarn add @pncl/mario`. To view our library on NPM, visit [this link](https://www.npmjs.com/package/@pncl/mario).

## Running your first app

Once you've been granted developer access, it is time for you to start building.

To make things a bit clearer, we've created a test example for you in `./test-app` that you can deploy and run in Pencil Spaces. This app implements the `@pncl/mario` library and all of its key features.

To get started, deploy the app:

1. `cd ./test-app && touch yarn.lock`
2. `yarn set version 3.1.0`
3. `yarn config set nodeLinker node-modules`
4. `yarn install`
5. `yarn dev`

You'll then be shown a deployment URL, typically `http://localhost:5173`

To run this app in Pencil Spaces, create a Space at `staging.pencilapp.com`. Then, open your App Library, scroll down to `Insert Mario App`, and then paste the localhost URL when prompted. If you see an error while pasting, you do not have permissions to use our app, and will need to contact Pencil Spaces Support to get started.

**Please note:** You will not be able to test your Mario apps in production unless your app has been approved by the Pencil Spaces team.

## Key features of Mario

To support collaborative development, the Mario package provides three key features:

1. **State synchronization:** This allows you to sync a consistent saved state across clients. When a client broadcasts a new state, all clients receive the updated state. States are persistent across disconnects, as well as exiting and re-entering the Space.
2. **Event broadcasting:** This allows one client to broadcast a message with a particular `eventId`. All clients subscribing to that `eventId` receive that payload. Unlike state synchronization, event broadcasting is not persistent - so clients will not receive missed events.
3. **User KYC:** On load, we provide the client with user details including name, picture, and userId of both the local user and everyone else in the Space. This data can be used to support a range of additional features in your application.

Implementations of all three features can be found in the `test-app` at `src/App.tsx`. Feel free to use this library however you'd like - you may use our package with your preferred FE library (in our case, we use `vite`), or you can also use plain JS / HTML.

## Deploying in production

Once your app is ready, please reach-out to your contact at Pencil Spaces. We will assist with getting your app listed in our App Library!
