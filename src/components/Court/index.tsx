import React, { useEffect, useState } from "react";
import CourtCard from "../../components/CourtCard";
import axios from "axios";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
function CourtListing() {
  const [data, setData] = useState([]);
  useEffect(() => {
    GetAllCourts();
  }, []);

  const GetAllCourts = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/sport/get_all`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <ButtonSecondary href={"/court/create"} className="flex justify-end">
          Add Court
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
            <CourtCard data={d} callBack={GetAllCourts} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourtListing;
