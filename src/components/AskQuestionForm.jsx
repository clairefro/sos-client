import { useEffect, useState } from "react";
import MarkdownEditor from "react-markdown-editor-lite";
import Button from "./blocks/Button";
import ButtonSecondary from "./blocks/ButtonSecondary";
import { mdParser } from "../util/mdParser";
import { delay } from "../util/delay";
import { calculateInputUsage } from "../util/calculateOpenAiUsage";
import { useGlobalState } from "../context/GlobalState";
import dummySystemMsg from "../content/dummySystemMsg";

import "react-markdown-editor-lite/lib/index.css";
import { pluck } from "../util/pluck";
import { sampleQuestions } from "../content/sampleQuestions";
import { costStore } from "../stores/costStore";
import PredictiveCostNotice from "./PredictiveCostNotice";
import { debounce } from "../util/debounce";

const AskQuestionForm = ({ handleAskQuestion }) => {
  const { generateThreadPrompt } = useGlobalState();

  const initUsd = calculateInputUsage({
    prompt: "",
    systemMsg: generateThreadPrompt || dummySystemMsg,
  }).usedUSD;

  const [q, setQ] = useState("");
  const [usedUsd, setUsedUsd] = useState(initUsd);

  const handleEditorChange = (event) => {
    /** MarkdownEditor event */
    const { text } = event;
    setQ(text);

    /** predict input token usage */
    debounce(displayUsage(text));
  };

  const displayUsage = (text) => {
    const usage = calculateInputUsage({
      prompt: text,
      systemMsg: generateThreadPrompt,
    });
    setUsedUsd(usage.usedUSD);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (q) {
      handleAskQuestion(q);

      // add cost and call to usage storage
      costStore.addCall();
      costStore.addCost(usedUsd);

      delay(100).then(() => {
        setUsedUsd(initUsd);
      });
      costStore.setQuestionCost(usedUsd);
    }
  };

  const handleClear = () => {
    const updatedQ = "";
    setQ(updatedQ);
    displayUsage(updatedQ);
  };

  const handleRandom = () => {
    const example = pluck(sampleQuestions);
    setQ(example);
  };

  useEffect(() => {
    costStore.initializeObject();
  }, []);

  return (
    <form id="ask-question-form" onSubmit={handleSubmit}>
      <div id="ask-question-form-editor">
        <MarkdownEditor
          id="question-markdown-editor"
          name="questionMarkdownEditor"
          placeholder="Ask a coding question..."
          value={q}
          onChange={handleEditorChange}
          style={{ minHeight: "250px", maxHeight: "450px" }}
          renderHTML={(text) => mdParser.render(text)}
        />
      </div>
      <PredictiveCostNotice usedUsd={usedUsd} />
      <Button type="submit" disabled={!q}>
        Ask Question
      </Button>
      <ButtonSecondary
        onClick={handleClear}
        className={q ? "" : "hidden"}
        style={{ marginLeft: "0.5rem" }}
      >
        Clear
      </ButtonSecondary>
      <ButtonSecondary
        onClick={handleRandom}
        className={!q ? "" : "hidden"}
        style={{ marginLeft: "0.5rem" }}
      >
        Random question
      </ButtonSecondary>
    </form>
  );
};

export default AskQuestionForm;
