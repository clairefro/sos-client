import { useEffect, useState } from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import Button from "./blocks/Button";
import { mdParser } from "../util/mdParser";
import { delay } from "../util/delay";
import { calculateContextUsage } from "../util/calculateOpenAiUsage";

import { usageStorage } from "../util/usageStorage";
import { currentDateStamp } from "../util/currentDatestamp";
import { useGlobalState } from "../context/GlobalState";

import "react-markdown-editor-lite/lib/index.css";

const AskQuestionForm = ({ handleAskQuestion }) => {
  const { setQuestionCost } = useGlobalState();

  const initUsd = calculateContextUsage("").usedUSD;

  const [q, setQ] = useState("");
  const [usedUsd, setUsedUsd] = useState(initUsd);

  const handleEditorChange = (event) => {
    /** MarkdownEditor event */
    const { text } = event;
    setQ(text);

    /** calculate context token usage */
    const usage = calculateContextUsage(text);
    setUsedUsd(usage.usedUSD);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAskQuestion(q);

    // add cost and call to usage storage
    usageStorage.addCallDate(currentDateStamp());
    usageStorage.addCost(usedUsd);

    setQ("");
    delay(100).then(() => {
      setUsedUsd(initUsd);
    });
    // parent
    setQuestionCost(usedUsd);
  };

  useEffect(() => {
    usageStorage.initializeObject();
  }, []);

  return (
    <form id="ask-question-form" onSubmit={handleSubmit}>
      <div id="ask-question-form-editor">
        <MarkdownEditor
          id="question-markdown-editor"
          name="questionMarkdownEditor"
          placeholder="Enter your question..."
          value={q}
          onChange={handleEditorChange}
          style={{ minHeight: "250px", maxHeight: "450px" }}
          renderHTML={(text) => mdParser.render(text)}
        />
      </div>
      <span className="cost-notice">
        Question will cost Claire <strong> ${usedUsd.toFixed(5)}</strong>
      </span>
      <Button type="submit">Ask Question</Button>
    </form>
  );
};

export default AskQuestionForm;
