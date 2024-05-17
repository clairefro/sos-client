import hljs from "highlight.js";
import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt({
    // TODO: Refactor to util
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value
                    }</code></pre>`;
            } catch (__) { }
        }
        return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
});

export { mdParser }