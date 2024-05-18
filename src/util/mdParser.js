import hljs from "highlight.js";
import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt({
    highlight: function (code, language) {
        if (language && hljs.getLanguage(language)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(code, { language, ignoreIllegals: true }).value
                    }</code></pre>`;
            } catch (__) { }
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(code)}</code></pre>`;
    },
});

export { mdParser }