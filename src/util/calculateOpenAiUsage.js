import { GPTTokens } from "gpt-tokens";
import { systemMsg } from "./systemMsg";
import config from "../config"; 

/** returned info shape: { usedTokens: <number>, usedUSD: <number> } */
function calculateContextUsage(prompt) {
  const info = new GPTTokens({
    model: config.OPENAI_CHAT_MODEL,
    messages: [
      { role: "system", content: systemMsg },
      { role: "user", content: prompt },
    ],
  });

  return info;
}

function calculateResponseUsage(content) {
  const info = new GPTTokens({
    model: config.OPENAI_CHAT_MODEL,
    messages: [{ role: "assistant", content: content }],
  });

  return info;
}

// How to use
// const usedTokens = calculateContextUsage("prompt").usedTokens;
// const initUsd = calculateContextUsage("prompt").usedUSD;

export { calculateContextUsage, calculateResponseUsage };
