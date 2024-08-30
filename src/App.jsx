import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GlobalStateProvider } from "./context/GlobalState";

import Layout from "./layouts/Layout";

/** Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/privacy" element={<Privacy />} />
            {/* I must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}

export default App;
