import React, { useEffect, useState } from "react";
import CourtCard from "../../components/CourtCard";
import axios from "axios";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { Loader } from "components/CustomLoader";
function CourtListing() {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    GetAllCourts();
  }, []);

  const GetAllCourts = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/sport/get_all`)
      .then((res) => {
        setData(res.data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <div className="w-full">
      <div className="flex justify-end">
        <ButtonSecondary href={"/court/create"} className="flex justify-end">
          Add Sports
        </ButtonSecondary>
      </div>
      {loader ? (
        <div className="flex w-full py-20 items-center justify-center">
          <Loader />
        </div>
      ) : data.length === 0 ? (
        <div className="h-[360px] flex items-center">
          <h1 className=" text-neutral-900 font-semibold text-center w-full text-xl dark:text-neutral-100 ">
            No Sport Found
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
