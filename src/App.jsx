import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GlobalStateProvider } from "./context/GlobalState";

import Layout from "./layouts/Layout";

/** Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" about element={<About />} />
            {/* I must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
