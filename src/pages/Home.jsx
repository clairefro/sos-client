import { useEffect, useState, useCallback } from "react";
import { useGlobalState } from "../context/GlobalState";
import Question from "../components/Question";
import { getSosResponse } from "../util/sosApi";
import AskQuestionForm from "../components/AskQuestionForm";
import AnswerThread from "../components/AnswerThread";
import Collapsible from "../components/blocks/Collapsible";
import { usageStorage } from "../util/usageStorage";
import { calculateResponseUsage } from "../util/calculateOpenAiUsage";
import ExpandableTab from "../components/blocks/ExpandableTab";
import UsageStats from "../components/UsageStats";

function Home() {
  const {
    question,
    setQuestion,
    answers,
    setAnswers,
    questionTitle,
    setQuestionTitle,
    setResponseCost,
  } = useGlobalState();
  const [isOpen, setIsOpen] = useState(true);
  const [showResponse, setShowResponse] = useState(false);

  const reset = useCallback(() => {
    setQuestionTitle("");
    setAnswers([]);
  }, [setQuestionTitle, setAnswers]);

  const handleAskQuestion = (q) => {
    reset();
    setQuestion(q);

    setIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log({ question });
      if (question) {
        setShowResponse(true);
        try {
          if (question) {
            setAnswers([]);
            const res = await getSosResponse(question);

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
            setAnswers(sortedAnswers);
            setQuestionTitle(res.questionTitle);
          }
        } catch (error) {
          setIsOpen(true);

          console.log(error.response.data.message);
          alert(error.response.data.message || error.message);

          reset();
          setShowResponse(false);
        }
      }
    };

    fetchData();
    return () => {};
  }, [
    question,
    /* won't change: */
    setAnswers,
    setQuestionTitle,
    setResponseCost,
    reset,
  ]);

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

        {showResponse && <Question title={questionTitle} body={question} />}
        {showResponse && <AnswerThread answers={answers} />}
        <ExpandableTab title="Usage">
          <UsageStats />
        </ExpandableTab>
      </div>
    </>
  );
}

export default Home;
