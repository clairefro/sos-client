import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";

import SplashLoader from "./components/loaders/SplashLoader";

// eslint-disable-next-line react-refresh/only-export-components
const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<SplashLoader />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
