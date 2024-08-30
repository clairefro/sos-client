import ContentLoader from "react-content-loader";

const ThreeDotsLoader = (props) => (
  <ContentLoader
    viewBox="0 0 400 160"
    height="5rem"
    width="100%"
    backgroundColor="transparent"
    title="Loading..."
    {...props}
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
);

export default ThreeDotsLoader;
