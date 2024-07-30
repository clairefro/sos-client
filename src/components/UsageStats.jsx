import { useEffect, useState } from "react";
import { usageStorage } from "../util/usageStorage";
import { useGlobalState } from "../context/GlobalState";

const UsageStats = () => {
  const { questionCost, responseCost } = useGlobalState();
  const [cost, setCost] = useState(0);
  const [callDates, setCallDates] = useState([]);

  useEffect(() => {
    updateStats();
  }, [questionCost, responseCost]);

  const updateStats = () => {
    setCost(usageStorage.getCost());
    setCallDates(usageStorage.getCallDates());
  };

  return (
    <div className="usage-stats">
      <p>You've asked</p>
      <p>
        <span className="highlight-stat">{callDates.length} questions</span>
      </p>
      <p>Costing Claire</p>
      <p>
        <span className="highlight-stat">${cost.toFixed(5)}</span>
      </p>
      <p>
        Enjoying this site and want others to enjoy it too? Consider making a{" "}
        <a
          href="https://buymeacoffee.com/clairefro"
          target="_blank"
          rel="noopener noreferrer"
        >
          donation
        </a>{" "}
        to keep it afloat!
      </p>
    </div>
  );
};

export default UsageStats;
