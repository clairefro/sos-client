import { BrowserRouter, Route, Routes } from "react-router-dom";

import { GlobalStateProvider } from "./context/GlobalState";

import Layout from "./layouts/Layout";

import ScrollToTop from "./components/shared/ScrollToTop";

/** Pages */
import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import useAn from "./util/an/usAn";

import "./App.css";

function App() {
  useAn();

  return (
    <BrowserRouter>
      <GlobalStateProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/privacy" element={<Privacy />} />
            <Route exact path="/contact" element={<Contact />} />

            {/* I must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}

export default App;
