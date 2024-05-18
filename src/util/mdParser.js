import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import { escapeHtml } from "markdown-it/lib/common/utils";

const mdParser = new MarkdownIt({
    highlight: function (code, language) {
        if (language && hljs.getLanguage(language)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(code, { language, ignoreIllegals: true }).value
                    }</code></pre>`;
            } catch (__) { }
        }
        return `<pre class="hljs"><code>${escapeHtml(code)}</code></pre>`;
    },
});

export { mdParser }