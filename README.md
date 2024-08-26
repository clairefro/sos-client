# StackOverflow Simulator - Client

A functional paradoy of Stack Overflow, using AI to generate instant replies to coding questions.

[demo](https://github.com/user-attachments/assets/544aae81-c468-4898-a914-c3ce8806d9cd)

This is the client app, which relies on the [Stack Overflow Simulator API](https://github.com/clairefro/sos-api)

![mermaid-diagram-2024-08-26-115855](https://github.com/user-attachments/assets/f6217db8-6418-420b-a909-9551528392c2)

## Devlopment and running locally

First, you'll need to clone and launch the [Stack Overflow Simulator API](https://github.com/clairefro/sos-api?tab=readme-ov-file#devlopment-and-running-locally)

Then clone this repo. From the project directory:

`cp .env.example .env` <-- sets up local environemtn variables for you

`npm install`
`npm run dev`)

This should launch the app on port :5172 by default. If the browser doesn't launch automaticcally, navigate to `http://localhost:5173`

The app will look for the API running on port :3000
