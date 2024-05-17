import { useEffect, useState } from "react";
import Question from "../components/Question";
import Answer from "../components/Answer";
import { getSosResponse } from "../util/sosApi";
import AskQuestionForm from "../components/AskQuestionForm";
import AnswerThread from "../components/AnswerThread";

const dummyBody = `
This question has been asked multiple times before. Please make sure to search for similar questions before posting. You can center your div by setting the margin property to auto in CSS.
`;

function Home() {
  const [question, setQuestion] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!!question) {
        try {
          if (!!question) {
            // setIsLoading(true);
            setAnswers([]);
            const res = await getSosResponse(question);
            setAnswers(res.answers);
            setQuestionTitle(res.questionTitle);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          // setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [question]);

  const handleAskQuestion = (q) => {
    setQuestion(q);
  };

  return (
    <>
      <div>
        <AskQuestionForm handleAskQuestion={handleAskQuestion} />
        {question && <Question title={questionTitle} body={question} />}
        {question && <AnswerThread answers={answers} />}
      </div>
    </>
  );
}

export default Home;
