# StackOverflow Simulator - Client

This is the client app, which relies on the Stack Overflow Simulator API]()

## Devlopment and running locally

First, you'll need to clone and launch the [Stack Overflow Simulator API](https://github.com/clairefro/sos-api?tab=readme-ov-file#devlopment-and-running-locally)

Then clone this repo. From the project directory:

`cp .env.example .env` <-- sets up local environemtn variables for you

`npm install`
`npm run dev`)

This should launch the app on port :5172 by default. If the browser doesn't launch automaticcally, navigate to `http://localhost:5173`

The app will look for the API running on port :3000
