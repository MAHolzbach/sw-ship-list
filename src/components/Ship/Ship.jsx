import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";

const Ship = ({ ship }) => {
  return (
    <div className="ship-wrapper">
      <p>Name: {ship.name}</p>
      <p>Passengers: {ship.passengers}</p>
      <p>Crew: {ship.crew}</p>
      <div className="hyperdrive-wrapper">
        <p className="hyperdrive-wrapper__text">Hyperdrive Class:</p>
        <div className="hyperdrive-wrapper__rating-wrapper">
          <ProgressBar hyperdrive={ship.hyperdrive} />
        </div>
      </div>
    </div>
  );
};

export default Ship;
