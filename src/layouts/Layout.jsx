import TopNav from "../components/containers/navs/TopNav";
import LeftNav from "../components/containers/navs/LeftNav";
import Footer from "../components/containers/Footer";

import UsageStats from "../components/info/UsageStats";
import ExpandableTab from "../components/blocks/ExpandableTab";

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
      <ExpandableTab title="Usage">
        <UsageStats />
      </ExpandableTab>
    </div>
  );
}

export default Layout;
