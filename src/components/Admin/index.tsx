import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import CourtListing from "components/Court";
import ManageBooking from "components/ManageBooking";
import Venue from "components/Venue";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "shared/Nav/Nav";
import NavItem from "shared/NavItem/NavItem";

function Admin() {
  const navigate = useNavigate();
  const tabs = ["Manage Booking", "Venue", "Court"];
  const [tabActiveState, setTabActiveState] = useState("Manage Booking");
  return (
    <div className="max-w-7xl m-auto p-3">
      <div className="flex items-center gap-4">
        <ChevronLeftIcon
          onClick={() => navigate("/")}
          className="w-8 h-8 cursor-pointer"
        />
        <h2 className={`text-3xl md:text-4xl my-5 font-semibold`}>
          Admin Console
        </h2>
      </div>

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
      {tabActiveState === "Manage Booking" ? (
        <ManageBooking />
      ) : tabActiveState === "Court" ? (
        <CourtListing />
      ) : (
        <Venue add={true} />
      )}
    </div>
  );
}

export default Admin;
