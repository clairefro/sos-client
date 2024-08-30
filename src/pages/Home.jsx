import { useCallback, useEffect, useState } from "react";

/** Components */
import AnswerThread from "../components/answer/AnswerThread";
import Collapsible from "../components/blocks/Collapsible";
import AskQuestionForm from "../components/question/AskQuestionForm";
import Question from "../components/question/Question";

/** State */
import { useGlobalState } from "../context/GlobalState";
import { costStore } from "../stores/costStore";
import { qaStore } from "../stores/qaStore";

/** Util */
import { calculateOutputUsage } from "../util/tokens/calculateOpenAiUsage";
import { SosApi } from "../lib/sosApi";

function Home() {
  const {
    questionTitle,
    setQuestionTitle,
    setGenerateThreadPrompt,
    setGenerateReplyPrompt,
    currentLocationPathname,
    previousLocationPathname,
  } = useGlobalState();

  const shouldPreserveQuestionState =
    currentLocationPathname !== previousLocationPathname && qaStore.question;

  const [isOpen, setIsOpen] = useState(
    shouldPreserveQuestionState ? false : true
  );
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
    /** Do not refetch answers when user navigates to other route  */
    if (shouldPreserveQuestionState) {
      setShowResponse(true);
      return;
    }

    const fetchData = async () => {
      if (qaStore.question) {
        setShowResponse(true);
        try {
          qaStore.setAnswers([]);
          const res = await SosApi.generateThead(qaStore.question);

          // add answer cost to usage
          const cost = calculateOutputUsage(
            JSON.stringify(res.answers)
          ).usedUSD;

          costStore.setResponseCost(cost);
          costStore.addCost(cost);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    effectKey,
    // /* won't change: */
    // setQuestionTitle,
    // reset,
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
    costStore.initializeObject();
  }, []);

  return (
    <>
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
    </>
  );
}

export default Home;
