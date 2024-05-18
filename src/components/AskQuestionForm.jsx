import { useState } from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import Button from "./blocks/Button";
import { mdParser } from "../util/mdParser";

import "react-markdown-editor-lite/lib/index.css";

const AskQuestionForm = ({ handleAskQuestion }) => {
  const [q, setQ] = useState("");

  const handleEditorChange = (event) => {
    /** MarkdownEditor event */
    const { text } = event;
    setQ(text);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAskQuestion(q);

    setQ("");
  };

  return (
    <form id="ask-question-form" onSubmit={handleSubmit}>
      <div id="ask-question-form-editor">
        <MarkdownEditor
          id="question-markdown-editor"
          name="questionMarkdownEditor"
          value={q}
          onChange={handleEditorChange}
          style={{ minHeight: "250px", maxHeight: "450px" }}
          renderHTML={(text) => mdParser.render(text)}
        />
      </div>
      <Button type="submit">Ask Question</Button>
    </form>
  );
};

export default AskQuestionForm;
