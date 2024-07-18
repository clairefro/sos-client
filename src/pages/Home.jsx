import { useEffect, useState } from "react";
import { useGlobalState } from "../context/GlobalState";
import Question from "../components/Question";
import { getSosResponse } from "../util/sosApi";
import AskQuestionForm from "../components/AskQuestionForm";
import AnswerThread from "../components/AnswerThread";
import Collapsible from "../components/blocks/Collapsible";
import { usageStorage } from "../util/usageStorage";
import { calculateResponseUsage } from "../util/calculateOpenAiUsage";

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

  useEffect(() => {
    const fetchData = async () => {
      if (question) {
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

            // TODO: VALIDATE RESPONSE
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
          // TODO: HANDLE
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [question]);

  useEffect(() => {
    usageStorage.initializeObject();
  }, []);

  const reset = () => {
    setQuestionTitle("");
    setAnswers([]);
  };

  const handleAskQuestion = (q) => {
    reset();
    setQuestion(q);

    setIsOpen(false);
  };

  return (
    <>
      <div id="main-content">
        <Collapsible
          title={isOpen ? "" : "Ask a coding question"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
          <AskQuestionForm handleAskQuestion={handleAskQuestion} />
        </Collapsible>

        {question && <Question title={questionTitle} body={question} />}
        {question && <AnswerThread answers={answers} />}
      </div>
    </>
  );
}

export default Home;
