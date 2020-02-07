import React, { useEffect, useState } from "react";
import ShipContext from "../../ShipContext";
import axios from "axios";
import Ship from "../Ship/Ship";

const App = () => {
  const [shipState, setShipState] = useState({
    ships: [
      {
        name: "",
        crew: null,
        passengers: null,
        hyperdrive: null
      }
    ],
    prevPage: "",
    nextPage: ""
  });

  useEffect(() => {
    const fetchShipData = async () => {
      const res = await axios.get("https://swapi.co/api/starships/");
      console.log("SHIP DATA:", res.data.results);
      setShipState({
        ships: packageShipData(res.data.results),
        prevPage: res.data.previous,
        nextPage: res.data.next
      });
    };
    fetchShipData();
  }, []);

  const packageShipData = shipData => {
    const shipArray = [];

    shipData.forEach(ship => {
      const formattedNameArray = ship.name.split("");
      formattedNameArray[0].toUpperCase();
      const formattedName = formattedNameArray.join("");

      let driveRating;
      const formattedDriveRating = Math.round(parseFloat(ship.hyperdrive_rating));

      if (formattedDriveRating >= 0 && formattedDriveRating < 1) {
        driveRating = 6;
      } else if (formattedDriveRating >= 1 && formattedDriveRating < 2) {
        driveRating = 5;
      } else if (formattedDriveRating >= 2 && formattedDriveRating < 3) {
        driveRating = 4;
      } else if (formattedDriveRating >= 3 && formattedDriveRating < 4) {
        driveRating = 3;
      } else if (formattedDriveRating >= 4 && formattedDriveRating < 5) {
        driveRating = 2;
      } else if (formattedDriveRating >= 5) {
        driveRating = 1;
      } else {
        driveRating = "unknown";
      }

      shipArray.push({
        name: formattedName,
        crew: ship.crew === "0" ? "None" : parseInt(ship.crew),
        passengers: ship.passengers === "0" ? "None" : parseInt(ship.passengers),
        hyperdrive: driveRating
      });
    });

    return shipArray;
  };

  return (
    <ShipContext.Provider value={shipState}>
      <>
        {shipState.ships.map(ship => (
          <Ship key={ship.name} ship={ship} />
        ))}
      </>
    </ShipContext.Provider>
  );
};

export default App;
