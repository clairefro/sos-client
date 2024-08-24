import { useEffect, useState, useCallback } from "react";
import { useGlobalState } from "../context/GlobalState";
import Question from "../components/Question";
import { SosApi } from "../util/sosApi";
import AskQuestionForm from "../components/AskQuestionForm";
import AnswerThread from "../components/AnswerThread";
import Collapsible from "../components/blocks/Collapsible";
import { usageStorage } from "../util/usageStorage";
import { calculateResponseUsage } from "../util/calculateOpenAiUsage";
import ExpandableTab from "../components/blocks/ExpandableTab";
import UsageStats from "../components/UsageStats";
import { qaStore } from "../stores/qaStore";

function Home() {
  const {
    question,
    questionTitle,
    setQuestionTitle,
    setResponseCost,
    setGenerateThreadPrompt,
    setGenerateReplyPrompt,
  } = useGlobalState();
  const [isOpen, setIsOpen] = useState(true);
  const [effectKey, setEffectKey] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  const reset = useCallback(() => {
    setQuestionTitle("");
    qaStore.setAnswers([]);
  }, [setQuestionTitle]);

  const handleAskQuestion = async (q) => {
    if (q) {
      reset();
      setIsOpen(false);
      qaStore.setQuestion(q);
      // force fetch even if previous question text is unaltered
      setEffectKey((prevKey) => prevKey + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (qaStore.question) {
        setShowResponse(true);
        try {
          qaStore.setAnswers([]);
          const res = await SosApi.generateThead(qaStore.question);

          // add answer cost to usage
          const cost = calculateResponseUsage(
            JSON.stringify(res.answers)
          ).usedUSD;

          setResponseCost(cost);
          usageStorage.addCost(cost);

          const sortedAnswers = res.answers.sort((a, b) => {
            if (a.isBest === b.isBest) {
              return 0;
            }
            if (a.isBest === true) {
              return -1;
            }
            return 1;
          });

          qaStore.setAnswers(sortedAnswers);
          setQuestionTitle(res.questionTitle);
        } catch (error) {
          setIsOpen(true);
          alert(error.response.data.message || error.message);

          reset();
          setShowResponse(false);
        }
      }
    };

    fetchData();
    return () => {};
  }, [
    effectKey,
    /* won't change: */
    setQuestionTitle,
    setResponseCost,
    reset,
  ]);

  // fetch system prompts from backend to calculate usage cost
  useEffect(() => {
    const initializePrompts = async () => {
      try {
        const { prompt: threadPrompt } = await SosApi.getGenerateThreadPrompt();
        const { prompt: replyPrompt } = await SosApi.getGenerateReplyPrompt();

        setGenerateThreadPrompt(threadPrompt);
        setGenerateReplyPrompt(replyPrompt);
      } catch (e) {
        console.error(e);
      }
    };
    initializePrompts();
  }, [setGenerateThreadPrompt, setGenerateReplyPrompt]);

  // set up local storage for usage tracking
  useEffect(() => {
    usageStorage.initializeObject();
  }, []);

  return (
    <>
      <div id="main-content">
        <Collapsible
          title="Ask a coding question"
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          hideTitleOnOpen={true}
        >
          <AskQuestionForm handleAskQuestion={handleAskQuestion} />
        </Collapsible>

        {showResponse && <Question title={questionTitle} />}
        {showResponse && <AnswerThread />}
        <ExpandableTab title="Usage">
          <UsageStats />
        </ExpandableTab>
      </div>
    </>
  );
}

export default Home;
