import { useRef } from "react";

const Collapsible = ({ title, isOpen, setIsOpen, children }) => {
  const contentRef = useRef(null);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible">
      <button className="collapsible-header" onClick={toggleCollapse}>
        <span>{title}</span>
        <span>{isOpen ? "▲" : "▼"} </span>
      </button>
      <div
        className={`collapsible-content ${isOpen ? "open" : ""}`}
        ref={contentRef}
        style={{
          maxHeight: `${isOpen ? "500px" : "0px"}`,
          overflow: "hidden",
          transition: "max-height 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
