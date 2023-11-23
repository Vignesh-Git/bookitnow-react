import axios from "axios";
import FeaturedVenueCard from "components/FeaturedVenueCard/FeaturedVenueCard";
import Venue from "components/Venue";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";

function VenueListing({ heading }: { heading?: string }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/venue/get_all`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="max-w-6xl m-auto">
      <h2 className="font-semibold text-4xl mt-5">{heading || "Venues"}</h2>
      {data.length === 0 ? (
        <div className="h-[360px] flex items-center">
          <h1 className=" text-neutral-900 font-semibold text-center w-full text-xl dark:text-neutral-100 ">
            No Venue Found
          </h1>
        </div>
      ) : (
        <div className="grid mt-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 w-full">
          {data.map((d) => (
            <FeaturedVenueCard data={d} />
          ))}
        </div>
      )}
    </div>
  );
}
export default VenueListing;
