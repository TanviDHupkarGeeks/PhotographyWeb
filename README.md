

## Getting Started

This website was created with the intention of sharing photographs on a specific
platform, where one can chance the requirement and the look and feel of the
website.

## Getting Started
 
### Prerequisites

- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)

View the `package.json` files for more specific configurations.

### Running

Getting started with the project is pretty simple. First you need to set up your
`.env` files under `/server/src` and `/client/src`.

After this, you just have to build the containers on docker and run 
docker-compose.

In the root folder, do:

```
$ docker-compose -build
$ docker-compose up
```

After this, your project will be online. In case you want to use the project
without Docker, just edit the `.env` files to your prefered parameters. You can 
view the `.env.example` files for a data sample.

## Built With

- MongoDB - database
- Node.js / Express - server side
- React - client side
- Docker - containers

## Write up

I started the project by writing the server-side first. It started with the
express routes and then the mongoose models. To install those modules, just run

```
$ npm i express mongoose
```

After this, I started to write the client-side and set up cors in order for the
client to interact with the server.

In the root folder, I ran

```
$ npx create-react-app client
```

Which created the root folder. Then, in `server/src`, I ran

```
$ npm i cors
```

Then, I wrote both `Dockerfile`, on `/client` and `/server`, and the
`docker-compose.yml` in the root.
