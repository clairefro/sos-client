import { useState, useEffect, useRef } from "react";
import Button from "./blocks/Button";
import { SosApi } from "../util/sosApi";
import { mdParser } from "../util/mdParser";
import ReplyVoteControls from "./ReplyVoteControls";
import { costStore } from "../stores/costStore";
import { calculateContextUsage } from "../util/calculateOpenAiUsage";
import { currentDateStamp } from "../util/currentDatestamp";
import { observer } from "mobx-react";
import { qaStore } from "../stores/qaStore";

const AddAComment = observer(({
  answerId
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [textareaVal, setTextareaVal] = useState("");
  const textareaRef = useRef(null);

  function handleChange(e) {
    setTextareaVal(e.target.value);
  }

  function handleAddComment() {
    const userReply = textareaVal;
    qaStore.addToThread(answerId, { role: "user", content: userReply });
    setIsOpen(false);
    setTextareaVal("");

    // Update cost with the newly added question
    const threadedQuestionCost = calculateContextUsage(userReply);
    costStore.setQuestionCost(costStore.questionCost + threadedQuestionCost.usedUSD);
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
});

function Reply({ content, username, role }) {
  return (
    <li className="reply">
      <ReplyVoteControls />
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

const AnswerReplyChat = observer(({ answerId, username }) => {
  // Have to use threads.get() instead of threads[id] here becuase it's an
  // observable map
  const thread = qaStore.threads.get(answerId);

  useEffect(() => {
    // only fetch reply if last item is of role "user"
    if (thread && thread[thread.length - 1].role === "user") {
      const fetchReply = async () => {
        try {
          const response = await SosApi.generateReply(thread);
          const { reply } = response;

          qaStore.addToThread(answerId, { role: "assistant", content: reply });

          // Update cost info
          costStore.setResponseCost(costStore.responseCost + calculateContextUsage(response).usedUSD);
          costStore.addCallDate(currentDateStamp())
        } catch (error) {
          alert("Error fetching data:", error);
        }
      };
      fetchReply();
    }
  }, [thread]);

  return (
    <div className="comment-replies">
      <Replies
        replies={thread && thread.length > 2 ? thread.slice(2) : []}
        username={username}
      />
      <AddAComment
        answerId={answerId}
      />
    </div>
  );
})

export default AnswerReplyChat;
