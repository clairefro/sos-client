import { useState } from "react";
import { mdParser } from "../util/mdParser";
import VoteControls from "../components/VoteControls";
import { randomAvatarDataUri } from "../util/randomAvatarDataUri";
import { randomInt } from "../util/randomInt";
import { randomBool } from "../util/randomBool";
import { randomFutureDateStr } from "../util/randomFutureDateStr";
import { currentDateStr } from "../util/currentDateStr";
import { useGlobalState } from "../context/GlobalState";
import AnswerReplyChat from "./AnswerReplyChat";

function ContentBoxFooter({ username, isQuestion }) {
  return (
    <div className="content-box-footer">
      <div className="content-box-footer-controls">
        Share&nbsp;&nbsp;Edit&nbsp;&nbsp;Follow&nbsp;&nbsp;Flag
      </div>
      <div className="content-box-footer-userinfo">
        <span className="content-box-footer-userinfo-timestamp">
          {isQuestion
            ? `asked ${currentDateStr()}`
            : `answered ${randomFutureDateStr()}`}
        </span>
        <div className="content-box-footer-userinfo-bottom">
          <img
            className="content-box-footer-userinfo-img"
            src={randomAvatarDataUri(username)}
          />
          <div className="content-box-footer-userinfo-right">
            <span className="content-box-footer-userinfo-username">
              {username}
            </span>
            <div className="content-box-footer-userinfo-userstats">
              <span>
                <strong>{randomInt(1, 5000).toLocaleString("en-US")}</strong>
              </span>
              {randomBool() && (
                <span className="user-stat gold">{randomInt(1, 100)}</span>
              )}
              {randomBool() && (
                <span className="user-stat silver">{randomInt(1, 100)}</span>
              )}
              {randomBool() && (
                <span className="user-stat bronze">{randomInt(1, 100)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentBoxMain({ body, username, thread, setThread, isQuestion }) {
  return (
    <div className="content-box-main">
      <div
        className="content-box-body"
        dangerouslySetInnerHTML={{ __html: mdParser.render(body) }}
      ></div>
      <ContentBoxFooter username={username} isQuestion={isQuestion} />
      {!isQuestion && <AnswerReplyChat thread={thread} setThread={setThread} />}
    </div>
  );
}

function ContentBox({ body, username, defaultVotes, isQuestion }) {
  const { question } = useGlobalState();

  const [thread, setThread] = useState([
    { role: "user", content: question },
    { role: "assistant", content: body },
  ]);

  return (
    <>
      <div className="content-box">
        <div className="content-box-vote">
          <VoteControls defaultVotes={defaultVotes} />
          <ContentBoxMain
            body={body}
            username={username}
            isQuestion={isQuestion}
            thread={thread}
            setThread={setThread}
          />
        </div>
      </div>
    </>
  );
}

export default ContentBox;
