import VoteControls from "./VoteControls";
import AnswerReplyChat from "../answer/AnswerReplyChat";

import { mdParser } from "../../util/md/mdParser";
import { randomAvatarDataUri } from "../../util/random/randomAvatarDataUri";
import { randomInt } from "../../util/random/randomInt";
import { randomBool } from "../../util/random/randomBool";
import { randomFutureDateStr } from "../../util/random/randomFutureDateStr";
import { currentDateStr } from "../../util/date/currentDateStr";

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

function ContentBoxMain({ answerId, body, username, isQuestion }) {
  return (
    <div className="content-box-main">
      <div
        className="content-box-body"
        dangerouslySetInnerHTML={{ __html: mdParser.render(body) }}
      ></div>
      <ContentBoxFooter username={username} isQuestion={isQuestion} />
      {!isQuestion && (
        <AnswerReplyChat answerId={answerId} username={username} />
      )}
    </div>
  );
}

function ContentBox({ answerId, body, username, defaultVotes, isQuestion }) {
  return (
    <>
      <div className="content-box">
        <div className="content-box-vote">
          <VoteControls defaultVotes={defaultVotes} />

          {
            // Adds a quick null check bc body goes undefined briefly on hot reload
            body && (
              <ContentBoxMain
                answerId={answerId}
                body={body}
                username={username}
                isQuestion={isQuestion}
              />
            )
          }
        </div>
      </div>
    </>
  );
}

export default ContentBox;
