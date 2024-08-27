import hljs from "highlight.js";
import { escapeHtml } from "markdown-it/lib/common/utils";

function markdownItHighlightCode(md) {
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const language = token.info.trim();
    const code = token.content;

    return highlightCode(code, language);
  };
}

function highlightCode(code, language) {
  if (language && hljs.getLanguage(language)) {
    try {
      return `<pre class="hljs"><code>${
        hljs.highlight(code, { language, ignoreIllegals: true }).value
      }</code></pre>`;
    } catch (e) {
      console.error(e);
    }
  }
  return `<pre class="hljs"><code>${escapeHtml(code)}</code></pre>`;
}

export { markdownItHighlightCode };
