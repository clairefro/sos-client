import TopNav from "../components/containers/TopNav";
import LeftNav from "../components/containers/LeftNav";
import SosHelmet from "../components/blocks/SosHelmet";

function Layout({ children }) {
  return (
    <div className="app-container">
      <SosHelmet />
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
