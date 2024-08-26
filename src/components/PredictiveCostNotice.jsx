const PredictiveCostNotice = ({ usedUsd }) => {
  return (
    <span className="cost-notice">
      Question will cost the web host <strong> ${usedUsd.toFixed(5)}</strong>
    </span>
  );
};

export default PredictiveCostNotice;
