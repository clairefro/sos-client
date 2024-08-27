import { useState, useEffect, useRef } from "react";
import Button from "./blocks/Button";
import { SosApi } from "../util/sosApi";
import { mdParser } from "../util/mdParser";
import ReplyVoteControls from "./ReplyVoteControls";
import { costStore } from "../stores/costStore";
import {
  calculateInputUsage,
  calculateOutputUsage,
} from "../util/calculateOpenAiUsage";
import { debounce } from "../util/debounce";
import { observer } from "mobx-react";
import { qaStore } from "../stores/qaStore";
import { useGlobalState } from "../context/GlobalState";
import dummySystemMsg from "../content/dummySystemMsg";
import PredictiveCostNotice from "./PredictiveCostNotice";

const AddAComment = observer(({ answerId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [textareaVal, setTextareaVal] = useState("");
  const textareaRef = useRef(null);
  const { generateReplyPrompt } = useGlobalState();

  // Have to use threads.get() instead of threads[id] here becuase it's an
  // observable map
  const thread = qaStore.threads.get(answerId);

  const initUsd = calculateInputUsage({
    messages: thread,
    systemMsg: generateReplyPrompt || dummySystemMsg,
  }).usedUSD;

  const [usedUsd, setUsedUsd] = useState(initUsd);

  function handleChange(e) {
    setTextareaVal(e.target.value);
    debounce(displayUsage(e.target.value));
  }

  function handleAddComment() {
    const userReply = textareaVal;
    qaStore.addToThread(answerId, { role: "user", content: userReply });
    setIsOpen(false);
    setTextareaVal("");

    // Update cost with the newly added question - convert message proxies into normal js objects
    const messages = JSON.parse(JSON.stringify(qaStore.threads.get(answerId)));

    const threadedQuestionCost = calculateInputUsage({
      messages,
      systemMsg: generateReplyPrompt || dummySystemMsg,
    });

    const newQuestionCost = threadedQuestionCost.usedUSD;
    costStore.addCall();
    costStore.addCost(newQuestionCost);
    costStore.setQuestionCost(costStore.questionCost + newQuestionCost);
  }

  function displayUsage(text) {
    const usage = calculateInputUsage({
      messages: [...thread, { role: "user", content: text }],
      systemMsg: generateReplyPrompt || dummySystemMsg,
    });
    setUsedUsd(usage.usedUSD);
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
          <PredictiveCostNotice usedUsd={usedUsd} />
        </>
      )}
    </div>
  );
});

function Reply({ content, username, role }) {
  return (
    <li className="reply-container">
      <div className="reply">
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
          costStore.setResponseCost(
            costStore.responseCost + calculateOutputUsage(reply).usedUSD
          );
        } catch (error) {
          alert("Error fetching data:", error);
        }
      };
      fetchReply();
    }
  }, [thread, answerId]);

  return (
    <div className="comment-replies">
      <Replies
        replies={thread && thread.length > 2 ? thread.slice(2) : []}
        username={username}
      />
      <AddAComment answerId={answerId} />
    </div>
  );
});

export default AnswerReplyChat;
