import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import { escapeHtml } from "markdown-it/lib/common/utils";

/** Custom plugin to render all markdown links to open in new tab (target=_blank) */
function markdownItTargetBlank(md) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options);
    };

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    // add target attr if not exist
    const aIndex = tokens[idx].attrIndex("target");

    if (aIndex < 0) {
      tokens[idx].attrPush(["target", "_blank"]);
    } else {
      tokens[idx].attrs[aIndex][1] = "_blank";

      // pass token to default renderer.
      //   return defaultRender(tokens, idx, options, env, self);
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

export { mdParser };
