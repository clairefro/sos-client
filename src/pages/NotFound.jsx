import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div>
        <p>
          How'd you get here? Go <Link to="/">home</Link>
        </p>
      </div>
    </>
  );
}

export default NotFound;
