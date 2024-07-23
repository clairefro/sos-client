import { Helmet } from "react-helmet";

const SosHelmet = ({ title, subtitle, description }) => {
  const URL = "stackoverflow.lol";
  const IMAGE_URL = "title.png";

  const resolvedSubtitle = subtitle ? " | " + subtitle : "";
  const resolvedTitle =
    (title || "Stack Overflow Simulator") + resolvedSubtitle;
  const resolvedDescription =
    description || "A functional museum for devs to debug";

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{resolvedTitle}</title>

      <meta name="description" content={resolvedDescription} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={URL} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={IMAGE_URL} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={URL} />
      <meta property="twitter:title" content={resolvedTitle} />
      <meta property="twitter:description" content={resolvedDescription} />
      <meta property="twitter:image" content={IMAGE_URL}></meta>
      <link rel="canonical" href={"https://www." + URL} />
    </Helmet>
  );
};

export default SosHelmet;
