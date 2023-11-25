import axios from "axios";
import FeaturedVenueCard from "components/FeaturedVenueCard/FeaturedVenueCard";
import FlightSearchForm, {
  IData,
} from "components/HeroSearchForm/(flight-search-form)/FlightSearchForm";
import React, { useEffect, useState } from "react";

function FilteredVenue() {
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/venue/get_all`)
      .then((res) => {
        setFilteredList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="container mx-auto">
      <FlightSearchForm />
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 my-5">
        {filteredList.map((d: any) => (
          <FeaturedVenueCard key={d._id} data={d} />
        ))}
      </div>
    </div>
  );
}

export default FilteredVenue;
