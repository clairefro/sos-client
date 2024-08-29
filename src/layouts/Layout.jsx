import TopNav from "../components/containers/navs/TopNav";
import LeftNav from "../components/containers/navs/LeftNav";
import Footer from "../components/containers/Footer";

function Layout({ children }) {
  return (
    <div className="app-container">
      <TopNav />
      <div className="page-container">
        <LeftNav />
        <main id="main-content-container" className="layout-container">
          <div id="main-content">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
