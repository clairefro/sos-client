import { useState } from "react";
import SVG from "react-inlinesvg";

function VoteControls() {
  const [votes, setVotes] = useState(Math.floor(Math.random() * 5001));

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
