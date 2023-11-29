import { Tab } from "@headlessui/react";
import { MinusCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { FC, Fragment, useEffect, useState } from "react";
import visaPng from "images/vis.png";
import mastercardPng from "images/mastercard.svg";
import { GuestsObject } from "components/HeroSearchForm/type";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import ModalSelectDate from "components/ModalSelectDate";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ModalSelectGuests from "components/ModalSelectGuests";
import Label from "components/Label/Label";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import FlightSearchForm from "components/HeroSearchForm/(flight-search-form)/FlightSearchForm";
import { useLocation } from "react-router-dom";
import Select from "shared/Select/Select";
import FlightDateRangeInput from "components/HeroSearchForm/(flight-search-form)/FlightDateRangeInput";
import TimeInput from "components/HeroSearchForm/TimeInput";
import DurationInput from "components/HeroSearchForm/DurationInput";
import axios from "axios";
import { toast } from "react-toastify";

export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  const location = useLocation();
  const [filteredData, setFilteredData] = useState<{
    date: Date | null;
    time: string;
    duration: string;
    sports: string;
    courts: string[];
  }>({
    date: null,
    time: "",
    duration: "",
    sports: "",
    courts: [],
  });

  const [days, setDays] = useState<number[]>([]);

  const [data, setData] = useState<any>();
  const router = useLocation();
  const id = router.pathname.split("/")[router.pathname.split("/").length - 1];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/venue/${id}`)
      .then((res) => setData(res.data))
      .catch(() => toast.error("Something went wrong!"));
  }, [id]);

  useEffect(() => {
    data &&
      setDays(
        data.available_days.map((d: string) => {
          switch (d) {
            case "sunday":
              return 0;
            case "monday":
              return 1;
            case "tuesday":
              return 2;
            case "wednesday":
              return 3;
            case "thursday":
              return 4;
            case "friday":
              return 5;
            case "saturday":
              return 6;
          }
        })
      );
  }, [data]);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let getLocation = queryParams.get("location");
    let getSports = queryParams.get("sports");
    let getDate = queryParams.get("date");
    let getTime = queryParams.get("time");
    let getDuration = queryParams.get("duration");
    let getCourts = queryParams.get("courts")?.split(",");
    if (getLocation !== null) {
      setFilteredData((prev: any) => ({ ...prev, location: getLocation }));
    }
    if (getCourts !== null) {
      setFilteredData((prev: any) => ({ ...prev, courts: getCourts }));
    }
    if (getSports !== null) {
      setFilteredData((prev: any) => ({ ...prev, sports: getSports }));
    }
    if (getDate !== null) {
      setFilteredData((prev: any) => ({ ...prev, date: getDate }));
    }
    if (getTime !== null) {
      setFilteredData((prev: any) => ({ ...prev, time: getTime }));
    }

    if (getDuration !== null) {
      setFilteredData((prev: any) => ({ ...prev, duration: getDuration }));
    }
  }, [location.search]);
  const [sports, setSports] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/sport/get_all`)
      .then((response) => {
        setSports(response.data.map((d: any) => d.name));
      })
      .catch((err) => toast.error("Something went wrong!"));
  }, []);
  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        <h3>Choose Sports</h3>
        <Select
          value={filteredData.sports}
          onChange={(e) =>
            setFilteredData((prev) => ({ ...prev, sports: e.target.value }))
          }
        >
          <option value="">Select any</option>
          {sports.map((sport) => (
            <option value={sport}>{sport}</option>
          ))}
        </Select>
        <div className="listingSectionSidebar__wrap p-4">
          <p>Select a Date</p>
          <FlightDateRangeInput
            onchange={(e) => setFilteredData((prev) => ({ ...prev, date: e }))}
            selectsRange={false}
            fieldClassName="py-2"
            value={filteredData.date}
            caption={false}
            filterDate={(date: Date) => {
              return days.includes(date.getDay());
            }}
          />
          <p>Select a start time and duration</p>
          <TimeInput
            caption={false}
            padding="p-0"
            placeHolder="Time"
            value={filteredData.time}
            onChange={(e) => setFilteredData((prev) => ({ ...prev, time: e }))}
          />
          <DurationInput
            value={filteredData.duration}
            onchange={(e) =>
              setFilteredData((prev) => ({ ...prev, duration: e }))
            }
            fieldClassName="p-0"
            placeHolder="Duration"
            caption={false}
          />

          <p>Select your preferred Court</p>
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
            {data &&
              data.courts.map((d: any) => (
                <>
                  <div className="flex justify-between">
                    {d.sport_id.name}
                    <button
                      onClick={() =>
                        filteredData.courts.includes(d.sport_id._id)
                          ? setFilteredData((prev) => {
                              let index = filteredData.courts.indexOf(
                                d.sport_id._id
                              );
                              if (index !== -1) {
                                filteredData.courts.splice(index, 1);
                              }

                              return { ...prev, courts: [...prev.courts] };
                            })
                          : setFilteredData((prev) => {
                              prev.courts.push(d.sport_id._id);
                              return { ...prev, courts: [...prev.courts] };
                            })
                      }
                      className={`border text-[blue] text-xs px-2 py-1 border-[blue] rounded-md ${
                        filteredData.courts.includes(d.sport_id._id)
                          ? "bg-[blue] text-[white]"
                          : ""
                      }`}
                    >
                      {filteredData.courts.includes(d.sport_id._id)
                        ? "Added"
                        : "Add"}
                    </button>
                  </div>
                  <div className="h-[1px] bg-neutral-200 dark:bg-neutral-700 my-3"></div>
                </>
              ))}
          </div>
          {data &&
            data.courts.filter((d: any) => {
              return filteredData.courts.includes(d.sport_id._id);
            }).length > 0 && (
              <>
                <div>Selected Court</div>
                <div>
                  {data.courts
                    .filter((d: any) => {
                      return filteredData.courts.includes(d.sport_id._id);
                    })
                    .map((d: any) => (
                      <div className="flex justify-between">
                        <p>{d.sport_id.name}</p>
                        <MinusCircleIcon
                          color="red"
                          className="w-5 cursor-pointer"
                          onClick={() =>
                            setFilteredData((prev) => {
                              let index = filteredData.courts.indexOf(
                                d.sport_id._id
                              );
                              if (index !== -1) {
                                filteredData.courts.splice(index, 1);
                              }

                              return { ...prev, courts: [...prev.courts] };
                            })
                          }
                        />
                      </div>
                    ))}
                </div>
              </>
            )}
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>$19 x 3 day</span>
            <span>$57</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$57</span>
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 my-5"></div>

          <div className="mt-6">
            <Tab.Group>
              <Tab.List className="flex my-5 gap-1">
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : "text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      Paypal
                    </button>
                  )}
                </Tab>
                <Tab as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`px-4 py-1.5 sm:px-6 sm:py-2.5  rounded-full flex items-center justify-center focus:outline-none  ${
                        selected
                          ? "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-900"
                          : " text-neutral-6000 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      }`}
                    >
                      <span className="mr-2.5">Credit card</span>
                      <img className="w-8" src={visaPng} alt="visa" />
                      <img
                        className="w-8"
                        src={mastercardPng}
                        alt="mastercard"
                      />
                    </button>
                  )}
                </Tab>
              </Tab.List>

              <Tab.Panels>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Card number </Label>
                    <Input defaultValue="111 112 222 999" />
                  </div>
                  <div className="space-y-1">
                    <Label>Card holder </Label>
                    <Input defaultValue="JOHN DOE" />
                  </div>
                  <div className="flex space-x-5  ">
                    <div className="flex-1 space-y-1">
                      <Label>Expiration date </Label>
                      <Input type="date" defaultValue="MM/YY" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label>CVC </Label>
                      <Input />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
                <Tab.Panel className="space-y-5">
                  <div className="space-y-1">
                    <Label>Email </Label>
                    <Input type="email" defaultValue="example@gmail.com" />
                  </div>
                  <div className="space-y-1">
                    <Label>Password </Label>
                    <Input type="password" defaultValue="***" />
                  </div>
                  <div className="space-y-1">
                    <Label>Messager for author </Label>
                    <Textarea placeholder="..." />
                    <span className="text-sm text-neutral-500 block">
                      Write a few sentences about yourself.
                    </span>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
            <div className="pt-8">
              <ButtonPrimary href={"/pay-done"}>Confirm and pay</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse gap-10 lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className=" flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
