import React from "react";

const NavButton = ({ direction, url, fetchAppData }) => {
  return (
    <>
      <button
        className={`nav-button ${url === null ? "nav-button--disabled" : ""}`}
        disabled={url === null ? true : false}
        onClick={() => fetchAppData(url)}
      >
        {direction}
      </button>
    </>
  );
};

export default NavButton;
