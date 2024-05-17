import Answer from "./Answer";
import ThreadLoader from "./loaders/ThreadLoader";
function AnswerThread({ answers }) {
  const Answers = () => {
    return (
      <ul>
        {answers.map((a, i) => (
          <li key={i}>
            <Answer content={a.content} username={a.username} />
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div className="answer-thread">
      {answers.length ? <Answers /> : <ThreadLoader />}
    </div>
  );
}

export default AnswerThread;
