import TopNav from "../components/containers/navs/TopNav";
import LeftNav from "../components/containers/navs/LeftNav";

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
    </div>
  );
}

export default Layout;
