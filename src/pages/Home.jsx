import { useEffect } from "react";
import Question from "../components/Question";
import AskQuestionButton from "../components/AskQuestionButton";
import { useGlobalState } from "../context/GlobalState";

const dummyBody = `
This question has been asked multiple times before. Please make sure to search for similar questions before posting. You can center your div by setting the margin property to auto in CSS.
`;

function Home() {
  const { globalState } = useGlobalState();
  const { question } = globalState;

  useEffect(() => {
    console.log({ question });
    if (!!question) {
      // TODO: CALL FOR THREAD
    }
  }, [question]);

  return (
    <>
      <div>
        <AskQuestionButton />
        <Question title="How to center a div?" body={question} />
      </div>
    </>
  );
}

export default Home;
