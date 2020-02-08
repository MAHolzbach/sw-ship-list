import React, { useEffect, useState } from "react";
import axios from "axios";
import Ship from "../Ship/Ship";
import NavButton from "../NavButton/NavButton";
import Spinner from "../Spinner/Spinner";

const App = () => {
  const [appState, setAppState] = useState({
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
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    fetchAppData("https://swapi.co/api/starships/");
  }, []);

  const fetchAppData = async url => {
    setShowSpinner(true);
    const res = await axios.get(url);
    setAppState({
      ships: packageShipData(res.data.results),
      prevPage: res.data.previous,
      nextPage: res.data.next
    });
    setShowSpinner(false);
  };

  const formatPeopleNumber = data => {
    let number;

    if (data === "0") {
      number = "None";
    } else if (data === "unknown") {
      number = "Unknown";
    } else {
      number = parseInt(data);
    }

    return number;
  };

  const setDriveRating = data => {
    let driveRating;
    const formattedDriveRating = parseFloat(data);

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
    } else if (formattedDriveRating >= 5 && formattedDriveRating < 6) {
      driveRating = 1;
    } else if (formattedDriveRating >= 6) {
      driveRating = 0;
    } else {
      driveRating = "unknown";
    }

    return driveRating;
  };

  const packageShipData = shipData => {
    const shipArray = [];

    shipData.forEach(ship => {
      const formattedName = ship.name.charAt(0).toUpperCase() + ship.name.substring(1);
      const crewNumber = formatPeopleNumber(ship.crew);
      const passengersNumber = formatPeopleNumber(ship.passengers);
      const driveRating = setDriveRating(ship.hyperdrive_rating);

      shipArray.push({
        name: formattedName,
        crew: crewNumber,
        passengers: passengersNumber,
        hyperdrive: driveRating
      });
    });

    return shipArray;
  };

  return (
    <div className="app-wrapper">
      <h1 className="app-wrapper__title">The Star Wars Ship Database</h1>
      {showSpinner ? (
        <div className="spinner-wrapper">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="app-wrapper__navbar">
            <NavButton direction={"PREVIOUS"} url={appState.prevPage} fetchAppData={fetchAppData} />
            <NavButton direction={"NEXT"} url={appState.nextPage} fetchAppData={fetchAppData} />
          </div>
          <div className="app-wrapper__ships">
            {appState.ships.map(ship => (
              <Ship key={ship.name} ship={ship} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
