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
      <p>{callDates.length} questions</p>
      <p>Costing the dev</p>
      <p>${cost}</p>
      <p>
        Enjoying SOS and want others to enjoy it too? Consider making a donation
        to keep it afloat!
      </p>
    </div>
  );
};

export default UsageStats;
