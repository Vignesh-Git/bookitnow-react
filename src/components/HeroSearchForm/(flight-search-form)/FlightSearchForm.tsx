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
  const [dropOffLocationType, setDropOffLocationType] =
    useState<TypeDropOffLocationType>("oneWay");
  const [flightClassState, setFlightClassState] = useState("Economy");

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(2);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(1);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(1);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestInfants") {
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }
  };

  const totalGuests =
    guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue;

  const renderGuest = () => {
    return (
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              as="button"
              className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              onClickCapture={() => document.querySelector("html")?.click()}
            >
              <span>{`${totalGuests || ""} Guests`}</span>
              <ChevronDownIcon
                className={`${
                  open ? "" : "text-opacity-70"
                } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-20 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 left-1/2 -translate-x-1/2  py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
                <NcInputNumber
                  className="w-full"
                  defaultValue={guestAdultsInputValue}
                  onChange={(value) => handleChangeData(value, "guestAdults")}
                  max={10}
                  min={1}
                  label="Adults"
                  desc="Ages 13 or above"
                />
                <NcInputNumber
                  className="w-full mt-6"
                  defaultValue={guestChildrenInputValue}
                  onChange={(value) => handleChangeData(value, "guestChildren")}
                  max={4}
                  label="Children"
                  desc="Ages 2–12"
                />

                <NcInputNumber
                  className="w-full mt-6"
                  defaultValue={guestInfantsInputValue}
                  onChange={(value) => handleChangeData(value, "guestInfants")}
                  max={4}
                  label="Infants"
                  desc="Ages 0–2"
                />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderSelectClass = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
              onClickCapture={() => document.querySelector("html")?.click()}
            >
              <span>{`${flightClassState}`}</span>
              <ChevronDownIcon
                className={`${
                  open ? "" : "text-opacity-70"
                } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-20 w-screen max-w-[200px] sm:max-w-[220px] px-4 top-full mt-3 transform -translate-x-1/2 left-1/2 sm:px-0  ">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
                    {flightClass.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setFlightClassState(item.name);
                          close();
                        }}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <p className="text-sm font-medium ">{item.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const [data, setData] = useState<IData>({
    location: "",
    sports: "",
    date: null,
    time: "",
    duration: "",
  });
  const location = useLocation();

  useEffect(() => {
    // const queryParams = new URLSearchParams(location.search);
    // if (queryParams.get("location") !== null) {
    //   setData((prev) => ({ ...prev, location: queryParams.get("location") }));
    // console.log(queryParams.get("location"));
    // }
    // if (queryParams.get("location")) {
    // }
    // setData((prev) => ({
    //   ...prev,
    //   location:
    //     queryParams.get("location") != null ? queryParams.get("location") : "",
    // }));
    // setData((prev) => ({
    //   ...prev,
    //   date:
    //     queryParams.get("date") != null
    //       ? new Date(queryParams.get("date"))
    //       : "",
    // }));
    // setData((prev) => ({
    //   ...prev,
    //   time: queryParams.get("sports") != null ? queryParams.get("time") : "",
    // }));
    // setData((prev) => ({
    //   ...prev,
    //   duration:
    //     queryParams.get("sports") != null ? queryParams.get("duration") : "",
    // }));
  }, []);

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 rounded-[40px] xl:rounded-[49px] rounded-t-2xl xl:rounded-t-3xl shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800">
        {/* {renderRadioBtn()} */}
        <div className="flex flex-1 rounded-full">
          <LocationInput
            value={data.location}
            placeHolder="Location"
            desc="Where do you want to play?"
            className="flex-1"
            onchange={(e) => setData((prev) => ({ ...prev, location: e }))}
          />
          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
          <SportInput
            value={data.sports}
            placeHolder="Sport"
            desc="What do you want to play?"
            className="flex-1"
            divHideVerticalLineClass=" -inset-x-0.5"
            onchange={(e) => setData((prev) => ({ ...prev, sports: e }))}
          />

          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
          <FlightDateRangeInput
            value={data.date}
            selectsRange={false}
            className="flex-1"
            onchange={(date) => setData((prev) => ({ ...prev, date: date }))}
          />

          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

          <TimeInput
            placeHolder="Time"
            desc="At what time?"
            className="flex-1"
            value={data.time}
            onChange={(e) => setData((prev) => ({ ...prev, time: e }))}
            divHideVerticalLineClass=" -inset-x-0.5"
          />

          <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>

          <DurationInput
            placeHolder="Duration"
            desc="How long?"
            className="flex-1"
            value={data.duration}
            divHideVerticalLineClass=" -inset-x-0.5"
            onchange={(e) => setData((prev) => ({ ...prev, duration: e }))}
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
