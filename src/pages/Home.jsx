import { useEffect, useState } from "react";
import Question from "../components/Question";
import Answer from "../components/Answer";
import AskQuestionButton from "../components/AskQuestionButton";
import { useGlobalState } from "../context/GlobalState";
import { getSosAnswerThread } from "../util/sosApi";

const dummyBody = `
This question has been asked multiple times before. Please make sure to search for similar questions before posting. You can center your div by setting the margin property to auto in CSS.
`;

function Home() {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { globalState } = useGlobalState();
  const { question } = globalState;

  useEffect(() => {
    const fetchData = async () => {
      if (!!question) {
        try {
          if (!!question) {
            setIsLoading(true);
            setAnswers([]);
            const res = await getSosAnswerThread(question);
            console.log("yoooooo");
            console.log(res.answers);
            setAnswers(res.answers);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [question]);

  return (
    <>
      <div>
        <AskQuestionButton />
        <Question title="How to center a div?" body={question} />
        {isLoading && <p>LOADING</p>}

        <ul>
          {answers.map((a, i) => (
            <li key={i}>
              <Answer content={a.content} username={a.username} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
