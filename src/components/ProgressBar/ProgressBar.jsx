import React from "react";

const ProgressBar = ({ hyperdrive }) => {
  return (
    <div
      className={`hyperdrive-rating ${hyperdrive === "unknown" ? "disabled" : ""}`}
      style={{ width: `${hyperdrive === "unknown" ? "0" : hyperdrive * 16.666}%` }}
    ></div>
  );
};

export default ProgressBar;
