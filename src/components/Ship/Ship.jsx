import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

const Ship = ({ ship }) => {
  return (
    <div className="ship-wrapper">
      <p className="ship-wrapper__name">{ship.name}</p>
      <div className="ship-wrapper__text-wrapper">
        <p>Passengers: {ship.passengers}</p>
        <p>Crew: {`${ship.crew === 0 ? None : ship.crew}`}</p>
      </div>
      <div className="hyperdrive-wrapper">
        <p className="hyperdrive-wrapper__text">Hyperdrive Class:</p>
        <div
          className={`${
            ship.hyperdrive === "unknown" ? "disabled-wrapper" : ""
          } hyperdrive-wrapper__rating-wrapper`}
        >
          <ProgressBar hyperdrive={ship.hyperdrive} />
        </div>
      </div>
    </div>
  );
};

export default Ship;
