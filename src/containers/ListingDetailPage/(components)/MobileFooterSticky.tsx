import React, { Fragment, useEffect, useState } from "react";
import ModalReserveMobile from "./ModalReserveMobile";
import ModalSelectDate from "components/ModalSelectDate";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import FlightSearchForm from "components/HeroSearchForm/(flight-search-form)/FlightSearchForm";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Select from "shared/Select/Select";
import FlightDateRangeInput from "components/HeroSearchForm/(flight-search-form)/FlightDateRangeInput";
import TimeInput from "components/HeroSearchForm/TimeInput";
import DurationInput from "components/HeroSearchForm/DurationInput";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const MobileFooterSticky = () => {
  const [showModal, setShowModal] = useState(false);

  const [filteredData, setFilteredData] = useState<{
    date: Date | null;
    time: string;
    duration: string;
    sports: string;
  }>({
    date: null,
    time: "",
    duration: "",
    sports: "",
  });
  const location = useLocation();
  const [sports, setSports] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/court/get_all`)
      .then((response) => {
        setSports(response.data.map((d: any) => d.name));
      })
      .catch((err) => toast.error("Something went wrong!"));
  }, []);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    let getLocation = queryParams.get("location");
    let getSports = queryParams.get("sports");
    let getDate = queryParams.get("date");
    let getTime = queryParams.get("time");
    let getDuration = queryParams.get("duration");
    if (getLocation !== null) {
      setFilteredData((prev: any) => ({ ...prev, location: getLocation }));
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
  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-end">
        <ButtonPrimary onClick={() => setShowModal(true)}>
          Book Now
        </ButtonPrimary>
      </div>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchFormMobile__Dialog relative z-50"
          onClose={() => setShowModal(false)}
        >
          <div className="fixed inset-0 bg-neutral-100 dark:bg-neutral-900">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative h-full flex-1 flex flex-col justify-between overflow-auto">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={() => setShowModal(false)}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>

                    <div className="flex-1 pt-12 py-1 flex flex-col ">
                      <div className="flex-1 bg-white dark:bg-neutral-900">
                        {/* <CheckOutPage /> */}
                        {/* <FlightSearchForm /> */}
                        <div className="listingSectionSidebar__wrap shadow-xl">
                          <h3>Choose Sports</h3>
                          <Select
                            value={filteredData.sports}
                            onChange={(e) =>
                              setFilteredData((prev) => ({
                                ...prev,
                                sports: e.target.value,
                              }))
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
                              onchange={(e) =>
                                setFilteredData((prev) => ({
                                  ...prev,
                                  date: e,
                                }))
                              }
                              selectsRange={false}
                              fieldClassName="py-2"
                              value={filteredData.date}
                              caption={false}
                            />
                            <p>Select a start time and duration</p>
                            <TimeInput
                              caption={false}
                              padding="p-0"
                              placeHolder="Time"
                              value={filteredData.time}
                              onChange={(e) =>
                                setFilteredData((prev) => ({
                                  ...prev,
                                  time: e,
                                }))
                              }
                            />
                            <DurationInput
                              value={filteredData.duration}
                              onchange={(e) =>
                                setFilteredData((prev) => ({
                                  ...prev,
                                  duration: e,
                                }))
                              }
                              fieldClassName="p-0"
                              placeHolder="Duration"
                              caption={false}
                            />

                            <p>Select your preferred Court</p>
                            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                              <div className="flex justify-between">
                                Court Name
                                <button className="border text-[blue] text-xs px-2 py-1 border-[blue] rounded-md">
                                  Add
                                </button>
                              </div>
                              <div className="h-[1px] bg-neutral-200 dark:bg-neutral-700 my-3"></div>
                            </div>
                          </div>
                          <ButtonPrimary disabled={true} href={"/checkout"}>
                            Reserve
                          </ButtonPrimary>
                        </div>
                      </div>
                    </div>
                  </>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MobileFooterSticky;
