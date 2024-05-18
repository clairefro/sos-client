import { useState } from "react";
import SVG from "react-inlinesvg";
import { randomInt } from "../util/randomInt";

function VoteControls({ defaultVotes }) {
  const [votes, setVotes] = useState(defaultVotes || randomInt(0, 500));

  const handleUpvote = () => {
    setVotes((v) => v + 1);
  };

  const handleDownvote = () => {
    setVotes((v) => v - 1);
  };

  return (
    <div className="vote-controls">
      <button className="vote-button" onClick={handleUpvote}>
        <SVG src="/icons/arrow-up.svg" title="Upvote"></SVG>
      </button>
      <span className="vote-display">{votes}</span>
      <button className="vote-button" onClick={handleDownvote}>
        <SVG src="/icons/arrow-down.svg" title="Upvote"></SVG>
      </button>
    </div>
  );
}

export default VoteControls;
