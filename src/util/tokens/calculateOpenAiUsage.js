import { GPTTokens } from "gpt-tokens";
import config from "../../config";

// for measuring cost of request (input) tokens.
// systemMsg should always be passed. prompt / messages  are either-or parameters
function calculateInputUsage({ messages, prompt, systemMsg }) {
  let info;
  if (prompt) {
    // case: prompt  system message (thread generation)
    info = new GPTTokens({
      model: config.OPENAI_CHAT_MODEL,
      messages: [
        { role: "system", content: systemMsg },
        { role: "user", content: prompt },
      ],
    });
  } else if (messages && messages.length) {
    // case: reply generation (messages passed)
    info = new GPTTokens({
      model: config.OPENAI_CHAT_MODEL,
      messages: [{ role: "system", content: systemMsg }, ...messages],
    });
  } else {
    info = new GPTTokens({
      model: config.OPENAI_CHAT_MODEL,
      messages: [{ role: "system", content: systemMsg }],
    });
  }

  return info;
}

function calculateOutputUsage(content) {
  const info = new GPTTokens({
    model: config.OPENAI_CHAT_MODEL,
    messages: [{ role: "assistant", content: content }],
  });

  return info;
}

// How to use
// const usedTokens = calculateContextUsage("prompt").usedTokens;
// const initUsd = calculateContextUsage("prompt").usedUSD;

export { calculateInputUsage, calculateOutputUsage };
