import { mdParser } from "../util/mdParser";
import VoteControls from "../components/VoteControls";

function ContentBox({ body, username, defaultVotes }) {
  return (
    <>
      <div className="content-box">
        <div className="content-box-vote">
          <VoteControls defaultVotes={defaultVotes} />
          <div className="content-box-main">
            <div
              className="content-box-body"
              dangerouslySetInnerHTML={{ __html: mdParser.render(body) }}
            ></div>
            <div className="content-box-footer">
              <div className="content-box-footer-controls">Share</div>
              <div className="content-box-footer-userinfo">{username}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentBox;
