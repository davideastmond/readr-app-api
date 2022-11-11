# Readr Newsreader Web App (API)

## About

Newsreader (back-end). It pulls news data from `newsApi` API service. This project also has a front-end React web app [Readr-Web](https://github.com/davideastmond/readr-app-web). Live deploy at [readr.live](https://www.readr.live)

## Stack

- express, mongodb, typescript

### Features

1. User accounts (registration, sign-in, sign-out)
2. View latest headlines
3. Bookmark articles for later reading
4. Customize news sources
5. Create a custom feed using keywords.

## Setup

0. Clone repo. Install dependencies with `npm i`
1. Create a `.env` in root directory of project. Use the variables in the env.sample as a model.
2. Create an API key at `newsApi.org` and use it for the var `DEV_NEWS_API_KEY`
3. For API_URL use UUID and make sure it is the same as the front end's API Key
4. Supply your mongodb connect string - use MongoDB cloud (ATLAS)
5. Make up a DEV_JSON_SECRET (UUID)

## Run

0. run `npm run dev` to start up the server: server should connect to mongodb and be listening on a PORT.
1. Start the front end. See link to frontend repo above.
