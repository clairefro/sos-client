import ThreeDotsLoader from "../loaders/ThreeDotsLoader";
import ContentBox from "../shared/ContentBox";

import { qaStore } from "../../stores/qaStore";

import { randomInt } from "../../util/random/randomInt";

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
        value={`${randomInt(0, 1000)} times`}
      />
    </div>
  );
}

function Question({ title }) {
  const hasResponse = !!title;

  const { question: body } = qaStore;

  return (
    <>
      <div className="question">
        <div className="question-title-box">
          {hasResponse ? <h1> {title} </h1> : <ThreeDotsLoader />}
          {hasResponse && <QuestionDetailsBox />}
        </div>
        <hr />
        {hasResponse && (
          <ContentBox username="you" body={body} isQuestion={true} />
        )}
      </div>
    </>
  );
}

export default Question;
