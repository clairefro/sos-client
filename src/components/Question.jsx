import ThreeDotsLoader from "./loaders/ThreeDotsLoader";
import ContentBox from "./ContentBox";

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
  const hasResponse = !!title;
  return (
    <>
      <div className="question">
        <div className="question-title-box">
          {hasResponse ? <h1> {title} </h1> : <ThreeDotsLoader />}
          {hasResponse && <QuestionDetailsBox />}
        </div>
        <hr />
        {hasResponse && <ContentBox username="you" body={body} />}
      </div>
    </>
  );
}

export default Question;
