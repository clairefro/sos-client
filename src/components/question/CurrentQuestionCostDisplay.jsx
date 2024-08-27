import { observer } from "mobx-react";

import { costStore } from "../../stores/costStore";

const CurrentQuestionCostDisplay = observer(() => {
  const { responseCost, questionCost } = costStore;

  return (
    <span className="cost-notice">
      Question and answers costed the web host{" "}
      <strong>${(responseCost + questionCost).toFixed(5)}</strong>
    </span>
  );
});

export default CurrentQuestionCostDisplay;
