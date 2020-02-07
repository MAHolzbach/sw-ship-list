import React from "react";

const ProgressBar = ({ hyperdrive }) => {
  return <div className="hyperdrive-rating" style={{ width: `${hyperdrive * 10}%` }}></div>;
};

export default ProgressBar;
