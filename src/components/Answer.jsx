import { mdParser } from "../util/mdParser";
import ContentBox from "./ContentBox";

function Answer({ content, username }) {
  return (
    <div className="answer">
      <ContentBox body={content} username={username} />
    </div>
  );
}

export default Answer;
