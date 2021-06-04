# <img src="https://user-images.githubusercontent.com/69874869/120747704-5ab78280-c4b6-11eb-8caa-5a084e6bc675.png" alt="biome" width="200" />

Biome is a web app for all your LA housing needs! Built using the MERN stack for the CS 35L final project at UCLA.

## Running locally

To run locally, first clone the repository to your local device. Then, to install all necessary dependencies/any new dependencies since the last commit, you can use `npm run install-all`.

To update all dependencies, you can use `npm run update`.

Run on a local server with `npm run dev`, which will start the development server at the port specified by `REACT_APP_PORT` in client/.env and a Node server at the port specified by `PORT` in server/.env.

You'll need two create these two .env files yourself if you want to run with your own data. Also, you'll need to create a [Mongo](https://www.mongodb.com/) account, as well as create a project, in which you'll create a [Mongo Atlas Cluster](https://docs.atlas.mongodb.com/getting-started/) with a database that contains 2 collections named `listings` and `users`. You'll also need to set up a [Mongo Realm App](https://docs.mongodb.com/realm/get-started/create-realm-app/) to utilize user authentication.

The .env file in the client directory should be of the format:
```
REACT_APP_PORT=3001
REACT_APP_REALM_APP_ID=app-id
```
where `REACT_APP_PORT` is a port of your choice that the Node server (not your React development server) is running on and `REACT_APP_REALM_APP_ID` is the [Mongo Realm App Id](https://docs.mongodb.com/realm/get-started/find-your-project-or-app-id/#:~:text=Your%20app%20ID%20is%20used,side%20of%20your%20application%20dashboard.&text=The%20UI%20displays%20your%20app%20name%20in%20the%20top%20left.).

The .env file in the server directory should be of the format:
```
DB="mongodb+srv://admin:<password>@<cluster-id>.mongodb.net/<database-name>?retryWrites=true&w=majority"
PORT="3001"
```
where `PORT` is the same port as the client/.env `REACT_APP_PORT`, since this is the port the Node server is running on, and `DB` is the link to connect to your Mongo Atlas Cluster (linked above).
