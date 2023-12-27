import {
  ChevronLeftIcon,
  ClockIcon,
  EyeIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Loader } from "components/CustomLoader";
import Tables from "components/Tables";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "shared/Input/Input";
import tokenHandler from "utils/tokenHandler";

function Bookings() {
  const [Body, setBody] = useState([]);

  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoader(true);
    let token = tokenHandler.searchInCookie("bint");
    if (token) {
      let decoded = tokenHandler.jwtDecode(token).payload;
      axios
        .get(
          `${process.env.REACT_APP_API_DOMAIN}/api/booking/get_by_user_id/${decoded.id}`
        )
        .then((res) => {
          setData(res.data);
          setBody(
            res.data.map((d: any) => ({
              name: {
                name: d?.venue_id?.name,
                imgSrc: d?.venue_id?.hero_image,
              },
              date: {
                date: d.date,
                startSlots: d.start_time,
                endSlots: d.end_time,
              },
              payment: d.amount_paid,
              status: d.status,
              details: d.venue_id,
              actions: d._id,
            }))
          );
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
        });
    }
  }, []);

  const Heading = [
    {
      title: "Court Name",
      index: "name",
      render: (a: any) => (
        <div className="flex gap-3">
          <img src={a.imgSrc} className="w-16 rounded-lg h-16" />
          <h5 className="text-[16px] font-medium my-2 text-[black] dark:text-[white]">
            {a.name}
          </h5>
        </div>
      ),
    },
    {
      title: "Date & Time",
      index: "date",
      render: (a: any) => {
        const inputDate = new Date(a.date);

        // Options for formatting the date
        const options: Intl.DateTimeFormatOptions = {
          weekday: "short",
          month: "short",
          day: "numeric",
        };

        // Format the date using toLocaleDateString
        const formattedDate = inputDate.toLocaleDateString("en-US", options);

        const TimeFormatter = (date: string) => {
          const inputDate = new Date(date);

          // Options for formatting the time
          const Timeoptions: Intl.DateTimeFormatOptions = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          };

          // Format the time using toLocaleTimeString
          const formattedTime = inputDate.toLocaleTimeString(
            "en-US",
            Timeoptions
          );

          return formattedTime;
        };

        return (
          <>
            <h5 className="text-[16px] my-2 text-[black] dark:text-[white]">
              {formattedDate}
            </h5>
            <h5 className="text-[16px] my-2 text-[black] dark:text-[white]">
              {TimeFormatter(a.startSlots)}-{TimeFormatter(a.endSlots)}
            </h5>
          </>
        );
      },
    },
    {
      title: "Payment",
      index: "payment",

      render: (a: any) => (
        <h5 className="text-[16px] my-2 text-[black] dark:text-[white]">
          $ {a}
        </h5>
      ),
    },
    {
      title: "Status",
      index: "status",

      render: (a: any) => (
        <div
          className={
            a === "approved"
              ? "bg-[green] text-[16px] p-1 rounded-md text-[white] font-medium w-fit flex gap-2 items-center"
              : a === "rejected"
              ? "bg-[red] text-[16px]  text-[white] p-1 rounded-md font-medium w-fit flex gap-2 items-center"
              : "bg-[orange] text-[16px] text-[white] p-1 rounded-md font-medium w-fit flex gap-2 items-center"
          }
        >
          {a === "approved" ? (
            <HandThumbUpIcon className="w-5 h-5" />
          ) : (
            <ClockIcon className="w-5 h-5" />
          )}
          {a}
        </div>
      ),
    },
    {
      title: "Details",
      index: "details",
      render: (a: any) => (
        <Link
          to={`/venue/${a}`}
          className="text-white-500 flex gap-1 text-[16px] cursor-pointer"
        >
          <EyeIcon className="w-5 h-5" />
          View Details
        </Link>
      ),
    },
    {
      title: "",
      index: "actions",
      render: (a: any) => (
        <>
          <button className="cursor-pointer flex gap-1">
            <PencilSquareIcon className="w-5" />
            Edit
          </button>
        </>
      ),
    },
  ];

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
        <div className="relative overflow-x-auto">
          {loader ? (
            <div className="flex py-12 items-center justify-center">
              <Loader />
            </div>
          ) : data.length === 0 ? (
            <h1 className="text-center py-6 font-semibold">No Data Found</h1>
          ) : (
            <>
              <div className="flex justify-end w-full">
                <Input
                  placeholder="Search"
                  id="Search"
                  className="mb-4 w-[270px]"
                />
              </div>
              <Tables Heading={Heading} Body={Body} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookings;
