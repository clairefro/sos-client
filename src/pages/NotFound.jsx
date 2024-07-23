import SosHelmet from "../components/blocks/SosHelmet";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <SosHelmet subtitle="Uh oh" />

      <div>
        <p>
          How'd you get here? Go <Link to="/">home</Link>
        </p>
      </div>
    </>
  );
}

export default NotFound;
