import { useState } from "react";

const ExpandableTab = ({ title = "Open", children }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`expandable-tab ${expanded ? "expanded" : ""}`}>
      <div className="tab-button" onClick={toggleExpand}>
        {expanded ? "Close" : title}
      </div>
      <div className="tab-content">{children}</div>
    </div>
  );
};

export default ExpandableTab;
