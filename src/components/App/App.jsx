import React, { useEffect, useState } from "react";
import ShipContext from "../../ShipContext";
import axios from "axios";

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
      setShipState({
        ships: packageShipData(res.data.results),
        prevPage: res.data.previous,
        nextPage: res.data.next
      });
    };
    fetchShipData();
    console.log(shipState.ships);
  }, []);

  const packageShipData = shipData => {
    const shipArray = [];

    shipData.forEach(ship => {
      shipArray.push({
        name: ship.name,
        crew: ship.crew,
        passengers: ship.passengers,
        hyperdrive: ship.hyperdrive_rating
      });
    });

    return shipArray;
  };

  return (
    <ShipContext.Provider value={shipState}>
      <div>
        {shipState.ships.map(ship => (
          <div>
            <p>{ship.name}</p>
            <p>{ship.crew}</p>
            <p>{ship.passengers}</p>
            <p>{ship.hyperdrive}</p>
          </div>
        ))}
      </div>
    </ShipContext.Provider>
  );
};

export default App;
