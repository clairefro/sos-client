import { randomInt } from "../util/randomInt";
import ContentBox from "./ContentBox";

function Answer({ id, content, username, isBest }) {
  return (
    <div className="answer">
      <ContentBox
        answerId={id}
        body={content}
        username={username}
        defaultVotes={isBest ? randomInt(501, 5000) : randomInt(0, 500)}
      />
    </div>
  );
}

export default Answer;
