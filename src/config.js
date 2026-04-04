// TODO: VALIDATE ENV VARS

const config = {
  SOS_API_BASE_URL: import.meta.env.VITE_SOS_API_BASE_URL,
  OPENAI_CHAT_MODEL: "gpt-5-nano",
  // Per-token prices — update from https://openai.com/api/pricing
  OPENAI_INPUT_PRICE_PER_TOKEN: 0.0000002, // $0.20 per 1M input tokens
  OPENAI_OUTPUT_PRICE_PER_TOKEN: 0.00000125, // $1.25 per 1M output tokens
};

export default config;
