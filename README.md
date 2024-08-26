# StackOverflow Simulator - Client

A functional parody of Stack Overflow, using AI to generate instant replies to coding questions.

[demo](https://github.com/user-attachments/assets/97b18e8c-d5bc-4c2b-b9b3-43bea328935e)

This is the client app, which relies on the [Stack Overflow Simulator API](https://github.com/clairefro/sos-api)

![mermaid-diagram-2024-08-26-115855](https://github.com/user-attachments/assets/f6217db8-6418-420b-a909-9551528392c2)

## Devlopment and running locally

You can run Stack Overflow Simulator locally using your own OpenAI API key for greater control of your data.

You will need your own [OpenAI API key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key)

### 1. Set up the sos-api

Clone and run the [Stack Overflow Simulator API](https://github.com/clairefro/sos-api?tab=readme-ov-file#devlopment-and-running-locally)

```sh
git clone git@github.com:clairefro/sos-api.git

# navigate to the project directory
cd sos-api

# set up environment
cp .env.example .env
# paste your OpenAI API key as the value for OPENAI_API_KEY in .env, save

npm install
npm run dev
```

The above steps will run the API on port 3000

### 2. Set up the sos-client

Somewhere else, clone this client repo

```sh
git clone git@github.com:clairefro/sos-client.git

# navigate to the project directory
cd sos-client

# set up environment
cp .env.example .env

npm install
npm run dev
```

This should launch the client app on port `:5173` by default. If the browser doesn't launch automaticcally, navigate to `http://localhost:5173`

The app will look for the API running on port :3000

Happy debugging!
