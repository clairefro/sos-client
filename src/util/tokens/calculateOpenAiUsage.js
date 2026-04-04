import { encodeChat } from "gpt-tokenizer";
import config from "../../config";

// gpt-tokenizer may not recognise newer model names; gpt-4o shares the same
// o200k_base tokeniser that the GPT-5 family uses, so token counts stay accurate.
const TOKENIZER_MODEL = "gpt-4o";

// for measuring cost of request (input) tokens.
// systemMsg should always be passed. prompt / messages are either-or parameters
function calculateInputUsage({ messages, prompt, systemMsg }) {
  let chatMessages;
  if (prompt) {
    // case: prompt + system message (thread generation)
    chatMessages = [
      { role: "system", content: systemMsg },
      { role: "user", content: prompt },
    ];
  } else if (messages && messages.length) {
    // case: reply generation (messages passed)
    chatMessages = [{ role: "system", content: systemMsg }, ...messages];
  } else {
    chatMessages = [{ role: "system", content: systemMsg }];
  }

  const usedTokens = encodeChat(chatMessages, TOKENIZER_MODEL).length;
  const usedUSD = usedTokens * config.OPENAI_INPUT_PRICE_PER_TOKEN;

  return { usedTokens, usedUSD };
}

function calculateOutputUsage(content) {
  const usedTokens = encodeChat(
    [{ role: "assistant", content }],
    TOKENIZER_MODEL
  ).length;
  const usedUSD = usedTokens * config.OPENAI_OUTPUT_PRICE_PER_TOKEN;

  return { usedTokens, usedUSD };
}

export { calculateInputUsage, calculateOutputUsage };
