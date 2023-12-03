import React, { Fragment, useEffect, useState } from "react";
import ModalReserveMobile from "./ModalReserveMobile";
import ModalSelectDate from "components/ModalSelectDate";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import FlightSearchForm from "components/HeroSearchForm/(flight-search-form)/FlightSearchForm";
import { Dialog, Transition } from "@headlessui/react";
import { MinusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Select from "shared/Select/Select";
import FlightDateRangeInput from "components/HeroSearchForm/(flight-search-form)/FlightDateRangeInput";
import TimeInput from "components/HeroSearchForm/TimeInput";
import DurationInput from "components/HeroSearchForm/DurationInput";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import tokenHandler from "utils/tokenHandler";
import PageLogin from "containers/PageLogin/PageLogin";

const MobileFooterSticky = () => {
  const [showModal, setShowModal] = useState(false);

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
  const location = useLocation();
  const [sports, setSports] = useState([]);

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

  const [loginState, setLoginState] = useState({
    isStateFinalized: false,
    isLoggedIn: false,
    isAdmin: false,
  });
  const [data, setData] = useState<any>();
  const [loginModal, setLoginModal] = useState(false);
  const router = useLocation();
  const id = router.pathname.split("/")[router.pathname.split("/").length - 1];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/venue/${id}`)
      .then((res) => {
        setData(res.data);
        setSports(
          res.data.courts.map((d: any) => ({
            label: d.sport_id.name,
            id: d.sport_id._id,
          }))
        );
      })
      .catch(() => toast.error("Something went wrong!"));
  }, [id]);
  const routers = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    let token = tokenHandler.searchInCookie("bint");
    if (token) {
      let decoded = tokenHandler.jwtDecode(token).payload;
      setLoginState({
        isStateFinalized: true,
        isLoggedIn: tokenHandler.isTokenValid(decoded.exp),
        isAdmin: ["admin"].includes(decoded.role.toLowerCase()),
      });
    }
  }, [loginState.isStateFinalized]);

  const [availabeTiming, setAvailableTiming] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);

  const getTime = (data: any) => {
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/api/venue/get_available_timings`,
        data
      )
      .then((res) => {
        setFilteredData((prev) => ({
          ...prev,
          time: "",
          courts: [],
          duration: "",
        }));
        setAvailableTiming(res.data);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  const getDuration = (data: any) => {
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/api/venue/get_durations`, data)
      .then((res) => {
        setDurationOptions(res.data);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };
  const [days, setDays] = useState<number[]>([]);

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
          onClose={() => {
            setShowModal(false);
            setFilteredData({
              date: null,
              time: "",
              duration: "",
              sports: "",
              courts: [],
            });
          }}
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
                        onClick={() => {
                          setShowModal(false);
                          setFilteredData({
                            date: null,
                            time: "",
                            duration: "",
                            sports: "",
                            courts: [],
                          });
                        }}
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
                            {sports.map((sport: any) => (
                              <option value={sport.id}>{sport.label}</option>
                            ))}
                          </Select>
                          {filteredData.sports && (
                            <div className="listingSectionSidebar__wrap p-4">
                              <p>Select a Date</p>
                              <FlightDateRangeInput
                                onchange={(e) => {
                                  setFilteredData((prev) => ({
                                    ...prev,
                                    date: e,
                                  }));
                                  if (e) {
                                    const searchDate = new Date(
                                      new Date(e).getTime() -
                                        new Date(e).getTimezoneOffset() * 60000
                                    ).toISOString();

                                    getTime({
                                      date: searchDate,
                                      sportId: filteredData.sports,
                                      venueId: id,
                                    });
                                  }
                                }}
                                filterDate={(date: Date) => {
                                  return days.includes(date.getDay());
                                }}
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
                                availableTiming={availabeTiming}
                                onChange={(e) => {
                                  if (e) {
                                    let currentDate = new Date();

                                    let matchResult =
                                      e.match(/(\d+):(\d+) (\w+)/);

                                    if (matchResult) {
                                      let [hours, minutes, period]: any =
                                        matchResult.slice(1);
                                      hours = parseInt(hours, 10);
                                      minutes = parseInt(minutes, 10);

                                      // Adjust hours for PM
                                      if (
                                        period.toLowerCase() === "pm" &&
                                        hours !== 12
                                      ) {
                                        hours += 12;
                                      }

                                      // Set the time on the current date
                                      currentDate.setHours(hours);
                                      currentDate.setMinutes(minutes);

                                      if (filteredData.date) {
                                        const searchDate = new Date(
                                          new Date(
                                            filteredData.date
                                          ).getTime() -
                                            new Date(
                                              filteredData.date
                                            ).getTimezoneOffset() *
                                              60000
                                        ).toISOString();

                                        getDuration({
                                          venueId: id,
                                          sportId: filteredData.sports,
                                          date: searchDate,
                                          start_time: currentDate,
                                        });
                                      }
                                    }
                                  }
                                  setFilteredData((prev) => ({
                                    ...prev,
                                    time: e,
                                  }));
                                }}
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
                                options={durationOptions}
                              />
                              {filteredData.duration && filteredData.time && (
                                <>
                                  <p>Select your preferred Court</p>
                                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                                    {data &&
                                      data.courts.map((d: any) => (
                                        <>
                                          <div className="flex justify-between">
                                            {d.sport_id.name}
                                            <button
                                              onClick={() =>
                                                filteredData.courts.includes(
                                                  d.sport_id._id
                                                )
                                                  ? setFilteredData((prev) => {
                                                      let index =
                                                        filteredData.courts.indexOf(
                                                          d.sport_id._id
                                                        );
                                                      if (index !== -1) {
                                                        filteredData.courts.splice(
                                                          index,
                                                          1
                                                        );
                                                      }

                                                      return {
                                                        ...prev,
                                                        courts: [
                                                          ...prev.courts,
                                                        ],
                                                      };
                                                    })
                                                  : setFilteredData((prev) => {
                                                      prev.courts.push(
                                                        d.sport_id._id
                                                      );
                                                      return {
                                                        ...prev,
                                                        courts: [
                                                          ...prev.courts,
                                                        ],
                                                      };
                                                    })
                                              }
                                              className={`border text-[blue] text-xs px-2 py-1 border-[blue] rounded-md ${
                                                filteredData.courts.includes(
                                                  d.sport_id._id
                                                )
                                                  ? "bg-[blue] text-[white]"
                                                  : ""
                                              }`}
                                            >
                                              {filteredData.courts.includes(
                                                d.sport_id._id
                                              )
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
                                      return filteredData.courts.includes(
                                        d.sport_id._id
                                      );
                                    }).length > 0 && (
                                      <>
                                        <div>Selected Court</div>
                                        <div>
                                          {data.courts
                                            .filter((d: any) => {
                                              return filteredData.courts.includes(
                                                d.sport_id._id
                                              );
                                            })
                                            .map((d: any) => (
                                              <div className="flex justify-between">
                                                <p>{d.sport_id.name}</p>
                                                <MinusCircleIcon
                                                  color="red"
                                                  className="w-5 cursor-pointer"
                                                  onClick={() =>
                                                    setFilteredData((prev) => {
                                                      let index =
                                                        filteredData.courts.indexOf(
                                                          d.sport_id._id
                                                        );
                                                      if (index !== -1) {
                                                        filteredData.courts.splice(
                                                          index,
                                                          1
                                                        );
                                                      }

                                                      return {
                                                        ...prev,
                                                        courts: [
                                                          ...prev.courts,
                                                        ],
                                                      };
                                                    })
                                                  }
                                                />
                                              </div>
                                            ))}
                                        </div>
                                      </>
                                    )}
                                </>
                              )}
                            </div>
                          )}
                          <ButtonPrimary
                            disabled={
                              !Boolean(
                                filteredData.courts.length > 0 &&
                                  filteredData.date &&
                                  filteredData.duration &&
                                  filteredData.sports &&
                                  filteredData.time
                              )
                            }
                            onClick={() => {
                              const queryParams = Object.keys(filteredData)
                                .map((key) => {
                                  if (
                                    Array.isArray(
                                      filteredData[
                                        key as keyof {
                                          date: Date | null;
                                          time: string;
                                          duration: string;
                                          sports: string;
                                          courts: string[];
                                        }
                                      ]
                                    )
                                  ) {
                                    // If the value is an array, join its elements
                                    return `${key}=${filteredData[
                                      key as keyof { courts: string[] }
                                    ].join(",")}`;
                                  } else {
                                    return `${key}=${encodeURIComponent(
                                      String(
                                        filteredData[
                                          key as keyof {
                                            date: Date | null;
                                            time: string;
                                            duration: string;
                                            sports: string;
                                            courts: string[];
                                          }
                                        ]
                                      )
                                    )}`;
                                  }
                                })
                                .join("&");

                              console.log(queryParams);
                              loginState.isLoggedIn
                                ? navigate(
                                    `/checkout/${
                                      routers.pathname.split("/")[
                                        routers.pathname.split("/").length - 1
                                      ]
                                    }?${queryParams}`
                                  )
                                : setLoginModal(true);
                            }}
                          >
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
      <Transition appear show={loginModal} as={Fragment}>
        <Dialog
          as="div"
          className="HeroSearchhtmlFormMobile__Dialog relative z-50"
          onClose={() => setLoginModal(false)}
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
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-between ">
                  <>
                    <div className="absolute left-4 top-4">
                      <button
                        className="focus:outline-none focus:ring-0"
                        onClick={() => setLoginModal(false)}
                      >
                        <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                      </button>
                    </div>
                    <PageLogin
                      openInModal={true}
                      callBack={() => setLoginModal(false)}
                    />
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
