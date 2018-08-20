# App starter

- Koa.js GraphQL server
- Local authentication with passport.js
- Next.js front end
- all in Typescript!

## MongoDB

- `docker-compose up`
- or run it locally
- or use a hosted service
- connection string is in ./apiServer/.env `MONGODB_CONNECTION_URL`

## GraphQL api (/apiServer)

- `cd apiServer`
- `npm i`
- `npm start`
- open [localhost:3000/graphql](http://localhost:3000/graphql)

## Next.js server

- `cd nextApp`
- `npm i`
- `npm start`

### Client side todos:

- log in / sign up form on the home page
- user profile page

## oneRing

TODO: koa-mount the api & next servers to run them both in a single instance of node so the app can be deployed to things like Heroku with as little hassle as possible :)

## TODO:

- api gql no duplicate users
- test api user gql
- api server TS no any
- next app talking to graphQL
- api server auth
