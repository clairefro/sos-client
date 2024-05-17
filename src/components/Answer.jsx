import { mdParser } from "../util/mdParser";

function Answer({ content, username }) {
  return (
    <div className="answer">
      <div
        className="answer-content"
        dangerouslySetInnerHTML={{ __html: mdParser.render(content) }}
      />
      <p>- {username}</p>
    </div>
  );
}

export default Answer;
