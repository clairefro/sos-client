// this load was built by danilowoz
// https://github.com/danilowoz/create-content-loader/blob/master/src/Gallery/insertYourLoaderHere/FadingLoader.jsx
import ContentLoader from "react-content-loader";

const FadingLoader = () => {
  return (
    <div>
      <FadingLoaderCard1 />
      <FadingLoaderCard2 />
      <FadingLoaderCard3 />
      <FadingLoaderCard4 />
      <FadingLoaderCard5 />
    </div>
  );
};

const FadingLoaderCard1 = () => {
  return (
    <ContentLoader
      width={400}
      height={40}
      backgroundColor="#ababab"
      foregroundColor="#fafafa"
    >
      <rect x="70" y="15" rx="5" ry="5" width="300" height="15" />
      <rect x="70" y="39" rx="5" ry="5" width="220" height="9" />
      <rect x="20" y="10" rx="0" ry="0" width="40" height="40" />
    </ContentLoader>
  );
};

const FadingLoaderCard2 = () => {
  return (
    <ContentLoader
      width={400}
      height={40}
      backgroundColor="#bfbfbf"
      foregroundColor="#fafafa"
    >
      <rect x="70" y="15" rx="5" ry="5" width="300" height="15" />
      <rect x="70" y="39" rx="5" ry="5" width="220" height="9" />
      <rect x="20" y="10" rx="0" ry="0" width="40" height="40" />
    </ContentLoader>
  );
};

const FadingLoaderCard3 = () => {
  return (
    <ContentLoader
      width={400}
      height={40}
      backgroundColor="#dadada"
      foregroundColor="#fafafa"
    >
      <rect x="70" y="15" rx="5" ry="5" width="300" height="15" />
      <rect x="70" y="39" rx="5" ry="5" width="220" height="9" />
      <rect x="20" y="10" rx="0" ry="0" width="40" height="40" />
    </ContentLoader>
  );
};

const FadingLoaderCard4 = () => {
  return (
    <ContentLoader
      width={400}
      height={40}
      backgroundColor="#ececec"
      foregroundColor="#fafafa"
    >
      <rect x="70" y="15" rx="5" ry="5" width="300" height="15" />
      <rect x="70" y="39" rx="5" ry="5" width="220" height="9" />
      <rect x="20" y="10" rx="0" ry="0" width="40" height="40" />
    </ContentLoader>
  );
};

const FadingLoaderCard5 = () => {
  return (
    <ContentLoader
      width={400}
      height={40}
      backgroundColor="#f7f7f7"
      foregroundColor="#fafafa"
    >
      <rect x="70" y="15" rx="5" ry="5" width="300" height="15" />
      <rect x="70" y="39" rx="5" ry="5" width="220" height="9" />
      <rect x="20" y="10" rx="0" ry="0" width="40" height="40" />
    </ContentLoader>
  );
};

FadingLoader.metadata = {
  name: "Nikhil Anand", // My name
  github: "anandnkhl", // Github username
  description: "Loader that fades downwards", // Little tagline
  filename: "FadingLoader", // filename of your loader
};

export default FadingLoader;
