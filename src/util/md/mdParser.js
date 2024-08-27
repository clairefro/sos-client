import MarkdownIt from "markdown-it";
import { markdownItCodeCopyButton } from "./plugins/markdownItCodeCopyButton";
import { markdownItTargetBlank } from "./plugins/markdownItTargetBlank";
import { markdownItHighlightCode } from "./plugins/markdownItHighlightCode";

const mdParser = new MarkdownIt();

mdParser.use(markdownItHighlightCode);
mdParser.use(markdownItTargetBlank);
mdParser.use(markdownItCodeCopyButton);

export { mdParser };
