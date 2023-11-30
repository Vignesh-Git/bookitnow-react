import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Loader } from "components/CustomLoader";
import Tables from "components/Tables";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "shared/Input/Input";
import tokenHandler from "utils/tokenHandler";

function Bookings() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoader(true);
    let token = tokenHandler.searchInCookie("bint");
    if (token) {
      let decoded = tokenHandler.jwtDecode(token).payload;
      axios
        .get(
          `${process.env.REACT_APP_API_DOMAIN}api/booking/get_by_user_id/${decoded.id}`
        )
        .then((res) => {
          setData(res.data);
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  }, []);
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl m-auto p-3">
      <div className="flex items-center gap-4">
        <ChevronLeftIcon
          onClick={() => navigate("/")}
          className="w-8 h-8 cursor-pointer"
        />
        <h2 className={`text-3xl md:text-4xl my-5 font-semibold`}>
          My Bookings
        </h2>
      </div>
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
            <Tables data={data} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookings;
