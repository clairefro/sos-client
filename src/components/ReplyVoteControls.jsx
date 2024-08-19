import { useState } from "react";
import SVG from "react-inlinesvg";

function ReplyVoteControls() {
  const [votes, setVotes] = useState(0);

  const handleUpvote = () => {
    setVotes((v) => v + 1);
  };

  return (
    <div className="reply-vote-controls">
      <span className="reply-vote-display">{votes ? votes : ""}</span>
      <div className="reply-vote-controls-buttons">
        <button className="reply-vote-button" onClick={handleUpvote}>
          <SVG src="/icons/arrow-up.svg" title="Upvote"></SVG>
        </button>

        <button className="reply-vote-button">
          <SVG src="/icons/flag.svg" title="Flag"></SVG>
        </button>
      </div>
    </div>
  );
}

export default ReplyVoteControls;
