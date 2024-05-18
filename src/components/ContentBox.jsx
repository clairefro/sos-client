import { mdParser } from "../util/mdParser";

function ContentBox({ body, username }) {
  return (
    <>
      <div className="content-box">
        <div
          className="content-box-body"
          dangerouslySetInnerHTML={{ __html: mdParser.render(body) }}
        ></div>
        <div className="content-box-footer">
          <div className="content-box-footer-controls">Share</div>
          <div className="content-box-footer-userinfo">{username}</div>
        </div>
      </div>
    </>
  );
}

export default ContentBox;
