import { useState, useEffect, useRef } from "react";
import Button from "./blocks/Button";
import { SosApi } from "../util/sosApi";
import { mdParser } from "../util/mdParser";

function AddAComment({ setThread }) {
  const [isOpen, setIsOpen] = useState(false);
  const [textareaVal, setTextareaVal] = useState("");
  const textareaRef = useRef(null);

  function handleChange(e) {
    setTextareaVal(e.target.value);
  }

  function handleAddComment() {
    const userReply = textareaVal;
    setThread((prev) => [...prev, { role: "user", content: userReply }]);
    setIsOpen(false);
    setTextareaVal("");
  }

  useEffect(() => {
    if (isOpen) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

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
              ref={textareaRef}
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

function ReplyUpvoteControls() {}

function Reply({ content, username, role }) {
  return (
    <li className="reply">
      <ReplyUpvoteControls />
      <div className="reply-body">
        <span
          dangerouslySetInnerHTML={{
            __html: mdParser.render(content.replace(/(@\S+)/g, "**$1**")),
          }}
          className="reply-content"
        ></span>
        <span> – </span>
        <span
          className={`reply-user-signature ${
            role === "assistant" ? "is-op" : ""
          }`}
        >
          {role === "user" ? "you" : username}
        </span>
        <span className="reply-timestamp"> a moment ago</span>
      </div>
    </li>
  );
}

function Replies({ replies, username }) {
  return (
    <ul className="replies">
      {replies.map((t, i) => (
        <Reply
          key={i}
          content={t.content}
          role={t.role}
          username={username}
        ></Reply>
      ))}
    </ul>
  );
}

function AnswerReplyChat({ thread, setThread, username }) {
  useEffect(() => {
    console.log("entered use effect");
    console.log(thread);
    // only fetch reply if last item is of role "user"
    if (thread[thread.length - 1].role === "user") {
      const fetchReply = async () => {
        try {
          const response = await SosApi.generateReply(thread);
          const { reply } = response;
          setThread((prev) => [...prev, { role: "assistant", content: reply }]);
        } catch (error) {
          alert("Error fetching data:", error);
        }
      };
      fetchReply();
    }
  }, [thread, setThread]);

  return (
    <div className="comment-replies">
      <Replies
        replies={thread.length > 2 ? thread.slice(2) : []}
        username={username}
      />
      <AddAComment setThread={setThread} />
    </div>
  );
}

export default AnswerReplyChat;
