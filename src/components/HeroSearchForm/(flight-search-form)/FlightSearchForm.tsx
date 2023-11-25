import React, { FC, useEffect, useState } from "react";
import LocationInput from "../LocationInput";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import FlightDateRangeInput from "./FlightDateRangeInput";
import { GuestsObject } from "../type";
import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import DurationInput from "../DurationInput";
import TimeInput from "../TimeInput";
import SportInput from "../SportInput";
import ButtonSubmit from "../ButtonSubmit";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export interface FlightSearchFormProps {}
export interface IData {
  location: string;
  sports: string;
  date: Date | null;
  time: string;
  duration: string;
}
const flightClass = [
  {
    name: "Economy",
    href: "##",
  },
  {
    name: "Business",
    href: "##",
  },
  {
    name: "Multiple",
    href: "##",
  },
];

export type TypeDropOffLocationType = "roundTrip" | "oneWay" | "";

const FlightSearchForm: FC<FlightSearchFormProps> = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any>({
    location: "",
    sports: "",
    date: null,
    time: "",
    duration: "",
  });

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let getLocation = queryParams.get("location");
    let getSports = queryParams.get("sports");
    let getDate = queryParams.get("date");
    let getTime = queryParams.get("time");
    let getDuration = queryParams.get("duration");
    if (getLocation !== null) {
      setData((prev: any) => ({ ...prev, location: getLocation }));
    }
    if (getSports !== null) {
      setData((prev: any) => ({ ...prev, sports: getSports }));
    }
    if (getDate !== null) {
      setData((prev: any) => ({ ...prev, date: getDate }));
    }
    if (getTime !== null) {
      setData((prev: any) => ({ ...prev, time: getTime }));
    }

    if (getDuration !== null) {
      setData((prev: any) => ({ ...prev, duration: getDuration }));
    }
  }, [location.search]);
  useEffect(() => {
    console.log(data);
  }, [data]);

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        <div className="flex flex-1 flex-col lg:flex-row rounded-full">
          <LocationInput
            value={data.location}
            placeHolder="Location"
            desc="Where do you want to play?"
            className="flex-1"
            onchange={(e) => setData((prev: any) => ({ ...prev, location: e }))}
          />
          <div className="self-center hidden lg:block border-r border-slate-200 dark:border-slate-700 h-8"></div>
          <SportInput
            value={data.sports}
            placeHolder="Sport"
            desc="What do you want to play?"
            className="flex-1"
            divHideVerticalLineClass=" -inset-x-0.5"
            onchange={(e) => setData((prev: any) => ({ ...prev, sports: e }))}
          />

          <div className="self-center hidden lg:block border-r border-slate-200 dark:border-slate-700 h-8"></div>
          <FlightDateRangeInput
            value={data.date}
            selectsRange={false}
            className="flex-1"
            onchange={(date) =>
              setData((prev: any) => ({ ...prev, date: date }))
            }
          />

          <div className="self-center hidden lg:block border-r border-slate-200 dark:border-slate-700 h-8"></div>

          <TimeInput
            placeHolder="Time"
            desc="At what time?"
            className="flex-1"
            value={data.time}
            onChange={(e) => setData((prev: any) => ({ ...prev, time: e }))}
            divHideVerticalLineClass=" -inset-x-0.5"
          />

          <div className="self-center  hidden lg:block border-r border-slate-200 dark:border-slate-700 h-8"></div>

          <DurationInput
            placeHolder="Duration"
            desc="How long?"
            className="flex-1"
            value={data.duration}
            divHideVerticalLineClass=" -inset-x-0.5"
            onchange={(e) => setData((prev: any) => ({ ...prev, duration: e }))}
          />

          <div className="py-4 pr-4">
            <div
              onClick={(e) => {
                var queryParams = Object.keys(data)
                  .map((key) => {
                    const value = data[key as keyof IData];

                    if (value !== "" && value !== null) {
                      return `${key}=${encodeURIComponent(String(value))}`;
                    } else {
                      return null;
                    }
                  })
                  .filter((param) => param !== null)
                  .join("&");

                navigate(`/filtered-venue?${queryParams}`);
              }}
              className="h-14 md:h-16 w-full md:w-16 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-neutral-50 focus:outline-none"
            >
              <span className="mr-3 md:hidden">Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </form>
    );
  };
  return renderForm();
};

export default FlightSearchForm;
