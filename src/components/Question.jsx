function QuestionTitleDetail({ label, value }) {
  return (
    <span>
      <span className="question-detail-label">{label}</span>
      <span className="question-detail-value">{value}</span>
    </span>
  );
}

function Question({ title, body }) {
  return (
    <>
      <div className="question">
        <div className="question-title-box">
          <h1>{title || "Ask a question"}</h1>
          <div className="question-title-details-box">
            <QuestionTitleDetail label="Asked" value="today" />
            <QuestionTitleDetail label="Modified" value="today" />
            <QuestionTitleDetail label="Viewed" value="99 times" />
          </div>
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
