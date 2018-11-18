# ⚛ React + Webpack 4 + PWA

## Features

This project has out-of-the-box support for the following things:

- General Setup
  - 🔥 Babel 7
  - 🔥 Webpack 4
  - 🔥 ESLint 5 (with a set of custom rules which may be mostly identical to AirBnB with some personal flavor added)
  - 🔥 Prettier
  - ✅ Hot Module Reloading (HMR)
  - ✅ CSS Modules
  - ✅ PostCSS

* Libs and Dependencies
  - ⚛ React 16.5
  - ✅ Redux + Thunk middleware + promise middleware
  - ✅ React Router 4
  - ✅ Graphql

## Installation

To install the node_modules

```sh
yarn install
```

or

```sh
npm i
```

## Usage

There are some environment variables we have set.

for development

`PORT= DEFINE PORT HERE`
`HOST= DEFINE HOST HERE`
`prod=false`

for production

`PORT= DEFINE PORT HERE`
`HOST= DEFINE HOST HERE`
`prod=true`

There are npm scripts for all the relevant things.

1). start in development mode.

#### `yarn start`

#### `npm start`

2). create build for production

#### `yarn run build`

#### `npm run build`

3). check with production server(NOTE: umcomment service worker code from src->client->index.js file)

#### `yarn run server`

#### `npm run server`

4). run with actually production server(NOTE: umcomment service worker code from src->client->index.js file)

#### `yarn run pm2`

#### `npm run pm2`

5). script to format code according to linting

#### `yarn run format`

#### `npm run format`
