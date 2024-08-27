import ContentBox from "../shared/ContentBox";

import { randomInt } from "../../util/random/randomInt";

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
