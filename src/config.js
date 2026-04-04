// TODO: VALIDATE ENV VARS

const config = {
  SOS_API_BASE_URL: import.meta.env.VITE_SOS_API_BASE_URL,
  OPENAI_CHAT_MODEL: "gpt-5-nano",
};

export default config;
