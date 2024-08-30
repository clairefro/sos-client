import { useEffect, useState } from "react";
import MarkdownEditor from "react-markdown-editor-lite";

// components
import Button from "../blocks/Button";
import ButtonSecondary from "../blocks/ButtonSecondary";
import PredictiveCostNotice from "../shared/PredictiveCostNotice";
import dummySystemMsg from "../../content/dummySystemMsg";

// state
import { useGlobalState } from "../../context/GlobalState";
import { costStore } from "../../stores/costStore";
import { qaStore } from "../../stores/qaStore";

// util
import { mdParser } from "../../util/md/mdParser";
import { delay } from "../../util/wait/delay";
import { calculateInputUsage } from "../../util/tokens/calculateOpenAiUsage";
import { pluck } from "../../util/random/pluck";
import { debounce } from "../../util/wait/debounce";

import { sampleQuestions } from "../../content/sampleQuestions";

// styles
import "react-markdown-editor-lite/lib/index.css";

const AskQuestionForm = ({ handleAskQuestion }) => {
  const { generateThreadPrompt } = useGlobalState();

  const initUsd = calculateInputUsage({
    prompt: "",
    systemMsg: generateThreadPrompt || dummySystemMsg,
  }).usedUSD;

  const [q, setQ] = useState(qaStore.question);
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
