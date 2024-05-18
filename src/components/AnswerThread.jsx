import Answer from "./Answer";
import ThreadLoader from "./loaders/ThreadLoader";
function AnswerThread({ answers }) {
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
