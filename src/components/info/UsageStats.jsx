import { observer } from "mobx-react-lite";

import { costStore } from "../../stores/costStore";

const UsageStats = observer(() => {
  const { cost, callDates } = costStore;

  return (
    <div className="usage-stats">
      <p>You've asked</p>
      <p>
        <span className="highlight-stat">
          {callDates.length} question{callDates.length === 1 ? "" : "s"}
        </span>
      </p>
      <p>Costing the web host</p>
      <p>
        <span className="highlight-stat">${cost.toFixed(5)}</span>
      </p>
      <p>Enjoying this site and want others to enjoy it too? </p>
      <p>
        Consider making a{" "}
        <a
          href="https://buymeacoffee.com/clairefro"
          target="_blank"
          rel="noopener noreferrer"
        >
          donation
        </a>
      </p>
    </div>
  );
});

export default UsageStats;
