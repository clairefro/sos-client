import { useGlobalState } from "../context/GlobalState";
import Answer from "./Answer";
import ThreadLoader from "./loaders/ThreadLoader";
import { qaStore } from "../stores/qaStore";
import { observer } from "mobx-react";
import { costStore } from "../stores/costStore";


const CurrentQuestionCostDisplay = observer(() => {
  const { responseCost, questionCost } = costStore;

  return (
    <span className="cost-notice">
      Question and answers costed the web host{" "}
      <strong>${(responseCost + questionCost).toFixed(5)}</strong>
    </span>
  )
});

const AnswerThread = observer(() => {
  // Pull state values directly from stores, the component will rerender when the values change
  // since it's an observer() and the values are being used during render
  const answers = qaStore.answers;

  // Rendering the AnswerThread content directly here so we don't need to create
  // another observable component inside this one
  return (
    <div className="answer-thread">
      {!answers || !answers.length ? <ThreadLoader /> : (
         <>
          <h2>{answers && answers.length} Answers</h2>
          <ul className="answer-thread-items">
            {answers.map((a, i) => (
              <li key={i}>
                <Answer
                  id={i}
                  content={a.content}
                  isBest={a.isBest}
                  username={a.username}
                />
              </li>
            ))}
          </ul>
          <CurrentQuestionCostDisplay />
        </>
      )}
    </div>
  );
});

export default AnswerThread;
