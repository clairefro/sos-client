import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import { escapeHtml } from "markdown-it/lib/common/utils";

/** Add copy to clipboard button for code fences */
function markdownItCodeCopyButton(md) {
  const defaultRender =
    md.renderer.rules.fence ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.fence = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const codeContent = token.content.trim();

    // Wrap <pre> and button in a parent <div> to allow relative button positioning
    const codeHtml = defaultRender(tokens, idx, options, env, self);
    const copyBtnDefaultText = "Copy";
    const copyBtnConfirmText = "OK!";
    return `<div class="code-container">${codeHtml}<button onclick="navigator.clipboard.writeText(this.previousElementSibling.innerText).then(() => { this.innerText = '${copyBtnConfirmText}'; setTimeout(() => { this.innerText = '${copyBtnDefaultText}'; }, 2000); })" class="copy-btn" data-clipboard-text="${escapeHtml(
      codeContent
    )}">${copyBtnDefaultText}</button></div>`;
  };
}

/** Custom plugin to render all markdown links to open in new tab (target=_blank) */
function markdownItTargetBlank(md) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // OPEN LINKS IN NEW TAB
    const aIndex = tokens[idx].attrIndex("target");

    if (aIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"]);
    } else {
      tokens[idx].attrs[aIndex][1] = "_blank";

      // pass token to default renderer.
      //   return defaultRender(tokens, idx, options, env, self);
    }

    // ADD EXTERNAL LINK ICON TO NON-RELATIVE LINKS
    const href = tokens[idx].attrGet("href");
    if (href && !href.startsWith("/")) {
      tokens[idx].attrSet("class", "ext-link");
    }

    return defaultRender(tokens, idx, options, env, self);
  };
}

/** Parser */

const mdParser = new MarkdownIt({
  highlight: function (code, language) {
    if (language && hljs.getLanguage(language)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(code, { language, ignoreIllegals: true }).value
        }</code></pre>`;
        // eslint-disable-next-line no-empty
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${escapeHtml(code)}</code></pre>`;
  },
});

mdParser.use(markdownItTargetBlank);
mdParser.use(markdownItCodeCopyButton);

export { mdParser };
