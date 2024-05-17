import ThreeDotsLoader from "./loaders/ThreeDotsLoader";

function QuestionTitleDetail({ label, value }) {
  return (
    <span>
      <span className="question-detail-label">{label}</span>
      <span className="question-detail-value">{value}</span>
    </span>
  );
}

function QuestionDetailsBox() {
  return (
    <div className="question-title-details-box">
      <QuestionTitleDetail label="Asked" value="today" />
      <QuestionTitleDetail label="Modified" value="today" />
      <QuestionTitleDetail
        label="Viewed"
        value={`${Math.floor(Math.random() * 1000) + 1} times`}
      />
    </div>
  );
}

function Question({ title, body }) {
  return (
    <>
      <div className="question">
        <div className="question-title-box">
          {title ? <h1> {title} </h1> : <ThreeDotsLoader />}
          <QuestionDetailsBox />
        </div>
        <hr />
        <div className="question-body">
          <p>{body}</p>
        </div>
      </div>
    </>
  );
}

export default Question;
