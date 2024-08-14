import { useState } from "react";
import Button from "./blocks/Button";

function AddAComment({ setThread }) {
  const [isOpen, setIsOpen] = useState(false);
  const [textareaVal, setTextareaVal] = useState("");

  function handleChange(e) {
    setTextareaVal(e.target.value);
  }

  function handleAddComment() {
    const userReply = textareaVal;
    setThread((prev) => [...prev, { role: "user", content: userReply }]);
    // TODO: fetch new reply
    setIsOpen(false);
    setTextareaVal("");
  }

  return (
    <div className="add-comment-toggle">
      {!isOpen ? (
        <button className="text-button" onClick={() => setIsOpen(true)}>
          Add a comment
        </button>
      ) : (
        <>
          <hr />
          <div className="reply-controls">
            <textarea
              placeholder='Use comments to ask for more information or suggest improvements. Avoid comments like "+1" or "thanks".'
              className="add-comment-input"
              value={textareaVal}
              onChange={handleChange}
            />
            <Button onClick={handleAddComment}>Add comment</Button>
          </div>
        </>
      )}
    </div>
  );
}

function Reply({ key, content }) {
  return (
    <li className="reply" key={key}>
      {content}
    </li>
  );
}

function Replies({ replies }) {
  return (
    <ul className="replies">
      {replies.map((t, i) => (
        <Reply key={i} content={t.content}></Reply>
      ))}
    </ul>
  );
}

function AnswerReplyChat({ thread, setThread }) {
  return (
    <div className="comment-replies">
      <Replies replies={thread.length > 2 ? thread.slice(2) : []} />
      <AddAComment setThread={setThread} />
    </div>
  );
}

export default AnswerReplyChat;
