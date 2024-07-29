import TopNav from "../components/containers/TopNav";
import LeftNav from "../components/containers/LeftNav";

function Layout({ children }) {
  return (
    <div className="app-container">
      <TopNav />
      <div className="page-container">
        <LeftNav />
        <main id="main-content-container" className="layout-container">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
