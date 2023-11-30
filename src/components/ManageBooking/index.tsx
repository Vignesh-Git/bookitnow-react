import axios from "axios";
import { Loader } from "components/CustomLoader";
import Tables from "components/Tables";
import React, { useEffect, useState } from "react";
import Input from "shared/Input/Input";

function ManageBooking() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    GetAll();
  }, []);

  const GetAll = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/booking/get_all`)
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
    <div className="p-5">
      <div className="flex justify-end w-full">
        <Input placeholder="Search" id="Search" className="mb-4 w-[270px]" />
      </div>
      <div className="relative overflow-x-auto">
        {loader ? (
          <div className="flex py-12 items-center justify-center">
            <Loader />
          </div>
        ) : data.length === 0 ? (
          <h1 className="text-center py-6 font-semibold">No Data Found</h1>
        ) : (
          <Tables data={data} callBack={GetAll} />
        )}
      </div>
    </div>
  );
}

export default ManageBooking;
