import CourtListing from "components/Court";
import Venue from "components/Venue";
import React, { useState } from "react";
import Nav from "shared/Nav/Nav";
import NavItem from "shared/NavItem/NavItem";

function Admin() {
  const tabs = ["Court", "Venue"];
  const [tabActiveState, setTabActiveState] = useState("Court");
  return (
    <div className="max-w-7xl m-auto p-3">
      <h2 className={`text-3xl md:text-4xl my-5 font-semibold`}>
        Admin Console
      </h2>

      <Nav
        className="sm:space-x-2"
        containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar"
      >
        {tabs.map((item, index) => (
          <NavItem
            key={index}
            isActive={tabActiveState === item}
            onClick={() => setTabActiveState(item)}
          >
            {item}
          </NavItem>
        ))}
      </Nav>
      {tabActiveState === "Court" ? <CourtListing /> : <Venue />}
    </div>
  );
}

export default Admin;
