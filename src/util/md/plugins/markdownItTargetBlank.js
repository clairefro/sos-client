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

export { markdownItTargetBlank };
