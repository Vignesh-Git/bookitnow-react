import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import VenueCard from "components/VenueCard";

function Venue() {
  const [data, setData] = useState([]);
  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/venue/get_all`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <ButtonSecondary href={"/create"} className="flex justify-end">
          Add Venue
        </ButtonSecondary>
      </div>
      {data.length === 0 ? (
        <div className="h-[360px] flex items-center">
          <h1 className=" text-neutral-900 font-semibold text-center w-full text-xl dark:text-neutral-100 ">
            No Court Found
          </h1>
        </div>
      ) : (
        <div className="grid mt-4 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 w-full">
          {data.map((d) => (
            <VenueCard data={d} callBack={GetAll} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Venue;
