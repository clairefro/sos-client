import { useGlobalState } from "../context/GlobalState";
import Answer from "./Answer";
import ThreadLoader from "./loaders/ThreadLoader";

function AnswerThread({ answers }) {
  const { responseCost, questionCost } = useGlobalState();

  const Answers = () => {
    return (
      <div>
        <h2>{answers.length} Answers</h2>
        <ul>
          {answers.map((a, i) => (
            <li key={i}>
              <Answer
                content={a.content}
                isBest={a.isBest}
                username={a.username}
              />
            </li>
          ))}
        </ul>
        <span className="cost-notice">
          Question and answers costed Claire{" "}
          <strong>${(responseCost + questionCost).toFixed(5)}</strong>
        </span>
      </div>
    );
  };

  return (
    <div className="answer-thread">
      {answers.length ? <Answers /> : <ThreadLoader />}
    </div>
  );
}

export default AnswerThread;
