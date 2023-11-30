import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import VenueCard from "components/VenueCard";
import { Loader } from "components/CustomLoader";

function Venue({ add }: { add?: boolean }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/venue/get_all`)
      .then((res) => {
        setData(res.data);
        setLoader(false);
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setLoader(false);
      });
  };

  return (
    <div className="w-full">
      {add && (
        <div className="flex justify-end">
          <ButtonSecondary href={"/venue/create"} className="flex justify-end">
            Add Venue
          </ButtonSecondary>
        </div>
      )}
      {loader ? (
        <div className="flex w-full py-20 items-center justify-center">
          <Loader />
        </div>
      ) : data.length === 0 ? (
        <div className="h-[360px] flex items-center">
          <h1 className=" text-neutral-900 font-semibold text-center w-full text-xl dark:text-neutral-100 ">
            No Venue Found
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
