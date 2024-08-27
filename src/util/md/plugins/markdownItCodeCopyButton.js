import { escapeHtml } from "markdown-it/lib/common/utils";

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

export { markdownItCodeCopyButton };
