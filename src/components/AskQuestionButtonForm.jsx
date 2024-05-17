import { useState } from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import Button from "../components/blocks/Button";
import { useGlobalState } from "../context/GlobalState";
import { mdParser } from "../util/mdParser";

import "react-markdown-editor-lite/lib/index.css";

const AskQuestionButtonForm = ({ closeModal }) => {
  const { setGlobalState } = useGlobalState();
  const [question, setQuestion] = useState("");

  const handleEditorChange = (event) => {
    /** MarkdownEditor event */
    const { text } = event;
    setQuestion(text);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setGlobalState((state) => ({ ...state, question }));

    setQuestion("");
    // TODO: GET SOS THREAD
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="questionMarkdownEditor">Enter your question</label>

        <MarkdownEditor
          id="question-markdown-editor"
          name="questionMarkdownEditor"
          value={question}
          onChange={handleEditorChange}
          style={{ minHeight: "250px", maxHeight: "450px" }}
          renderHTML={(text) => mdParser.render(text)}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default AskQuestionButtonForm;
