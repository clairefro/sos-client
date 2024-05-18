import { useEffect, useState } from "react";
import Question from "../components/Question";
import { getSosResponse } from "../util/sosApi";
import AskQuestionForm from "../components/AskQuestionForm";
import AnswerThread from "../components/AnswerThread";
import Collapsible from "../components/blocks/Collapsible";

function Home() {
  const [question, setQuestion] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!!question) {
        try {
          if (!!question) {
            setAnswers([]);
            const res = await getSosResponse(question);
            // TODO: VALIDATE THAT RESPONSE IS VALID
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
          // TODO: HANDLE THIS
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [question]);

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
      <div>
        <Collapsible
          title="Ask a coding question"
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
