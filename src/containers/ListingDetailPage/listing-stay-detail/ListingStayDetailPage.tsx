import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ChartBarIcon,
  MinusCircleIcon,
  Squares2X2Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import DetailPagetLayout from "../Layout";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "shared/Select/Select";
import FlightDateRangeInput from "components/HeroSearchForm/(flight-search-form)/FlightDateRangeInput";
import TimeInput from "components/HeroSearchForm/TimeInput";
import DurationInput from "components/HeroSearchForm/DurationInput";
import tokenHandler from "utils/tokenHandler";
import { Dialog, Transition } from "@headlessui/react";
import PageLogin from "containers/PageLogin/PageLogin";
import SportInput from "components/HeroSearchForm/SportInput";
import CustomLoader from "components/CustomLoader";
import { optionsList } from "components/HeroSearchForm/TimeInput";

const StayDetailPageContainer = ({
  data,
  sports,
}: {
  data: any;
  sports: string[];
}) => {
  //

  const thisPathname = useLocation().pathname;
  const router = useNavigate();
  const routers = useLocation();

  const handleOpenModalImageGallery = () => {
    router(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE`);
  };

  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const [availabilityFilterData, setAvailabilityFilterData] = useState<{
    date: Date | null;
    sports: string;
  }>({
    date: null,
    sports: "",
  });

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap !space-y-6">
        {/* 2 */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold capitalize">
          {data.name}
        </h2>

        {/* 3 */}
        <div className="flex items-center space-x-4">
          <span>
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1">
              {`${data.address.street_name},
                ${data.address.city},
                ${data.address.country},
                ${data.address.state},
                ${data.address.country}`}
            </span>
          </span>
        </div>

        {/* 5 */}
        <div className="w-full border-b border-neutral-100 dark:border-neutral-700" />

        {/* 6 */}
        <div className="flex w-full items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            <i className=" las la-user text-2xl "></i>
            <span className="">
              {data.courts.length}{" "}
              <span className="hidden sm:inline-block">Courts</span>
            </span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="border border-[blue] text-[blue] text-xs px-2 py-2 cursor-pointer rounded-sm"
          >
            View Availability
          </button>
        </div>
        <Transition appear show={showModal} as={Fragment}>
          <Dialog
            as="div"
            className="HeroSearchFormMobile__Dialog relative z-50"
            onClose={closeModal}
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
                          onClick={closeModal}
                        >
                          <XMarkIcon className="w-5 h-5 text-black dark:text-white" />
                        </button>
                      </div>
                    </>
                    <div className="w-1/2 m-auto flex-1 pt-12 p-1 flex flex-col overflow-auto">
                      <h1 className="text-2xl text-[white]">
                        Live Availability
                      </h1>
                      <div className="w-[120px] h-[1px] bg-slate-700 mt-3"></div>
                      <SportInput
                        value={availabilityFilterData.sports}
                        placeHolder="Sport"
                        desc="What do you want to play?"
                        divHideVerticalLineClass=" -inset-x-0.5"
                        className="block"
                        onchange={(e) =>
                          setAvailabilityFilterData((prev) => ({
                            ...prev,
                            sports: e,
                          }))
                        }
                      />
                      <FlightDateRangeInput
                        selectsRange={false}
                        onchange={(e) =>
                          setAvailabilityFilterData((prev) => ({
                            ...prev,
                            date: e,
                          }))
                        }
                        value={availabilityFilterData.date}
                      />
                      <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col">
                          <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="inline-block min-w-full align-middle">
                              <div className="overflow-hidden ">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                  <thead className="bg-gray-100 dark:bg-gray-700">
                                    <tr>
                                      <th
                                        scope="col"
                                        className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                      >
                                        Court Name
                                      </th>
                                      {optionsList.map((d) => (
                                        <th
                                          scope="col"
                                          className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                        >
                                          {d}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Badminton Court
                                      </td>
                                      {optionsList.map((d, idx) => (
                                        <td
                                          className={`py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white ${
                                            idx % 2 === 0 &&
                                            "bg-[blue] rounded-t-md"
                                          }`}
                                        ></td>
                                      ))}
                                    </tr>
                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                      <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Badminton Court
                                      </td>
                                      {optionsList.map((d, idx) => (
                                        <td
                                          className={`py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white 
                                          ${
                                            idx % 2 !== 0 &&
                                            "bg-[blue] rounded-b-md"
                                          }`}
                                        ></td>
                                      ))}
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Court inhtmlFormation</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="text-neutral-6000 dark:text-neutral-300">
          <p className="text-xl font-semibold">Description</p>
          {data.description}
        </div>
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {data.amenities
            .filter((_: any, i: any) => i < 12)
            .map((item: any) => (
              <div key={item.name} className="flex items-center space-x-3">
                {/* <i className={`text-3xl las ${item.icon}`}></i> */}
                <span className=" ">
                  {item === "parking"
                    ? "Parking"
                    : item === "firstAid"
                    ? "First Aid"
                    : item === "drinkingWater"
                    ? "Drinking Water"
                    : item === "changeRoom"
                    ? "Change Room"
                    : item === "shower"
                    ? "Shower"
                    : item}
                </span>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Available Days </h2>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            {data.available_days.map((day: string, index: number) => (
              <div
                className={`p-4 capitalize  flex justify-between items-center space-x-4 rounded-lg ${
                  index % 2 === 0 ? "bg-neutral-100 dark:bg-neutral-800" : ""
                }`}
              >
                <span>{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <>
        <div className="listingSection__wrap cursor-pointer">
          {/* HEADING */}
          <div>
            <h2 className="text-2xl font-semibold">Pricing</h2>
          </div>
          <div className="mt-4 overflow-auto text-neutral-700 dark:text-neutral-300">
            {data.courts.map((d: any) => (
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-5">
                <div className="flex gap-4 items-center capitalize">
                  <ChartBarIcon className="w-7 h-7" />
                  {d.court_name}
                </div>
                <div className="w-20 border-b my-3 border-neutral-200 dark:border-neutral-700"></div>

                <p>
                  {Object.entries(d.price).map((price: any) => {
                    if (price[0] !== "_id") {
                      return (
                        <>
                          {price[1].length > 0 && (
                            <p>
                              <div className="capitalize"> {price[0]}</div>
                              {price[1].map((res: any) => (
                                <div className="flex gap-2 px-5 py-2">
                                  <p>
                                    {new Date(res.time_from)
                                      .getUTCHours()
                                      .toString()
                                      .padStart(2, "0")}
                                    :
                                    {new Date(res.time_from)
                                      .getUTCMinutes()
                                      .toString()
                                      .padStart(2, "0")}
                                  </p>
                                  <p>-</p>
                                  <p>
                                    {new Date(res.time_to)
                                      .getUTCHours()
                                      .toString()
                                      .padStart(2, "0")}
                                    :
                                    {new Date(res.time_to)
                                      .getUTCMinutes()
                                      .toString()
                                      .padStart(2, "0")}
                                  </p>
                                  <div>:</div>
                                  <p>{res.amount} per Hour</p>
                                </div>
                              ))}
                            </p>
                          )}
                        </>
                      );
                    }
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const renderSection6 = (data: any) => {
    console.log(data);
    return (
      <>
        <div className="listingSection__wrap cursor-pointer">
          <div>
            <h2 className="text-2xl font-semibold capitalize">
              {data.court_name}
            </h2>
          </div>
          <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
            <div className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer ">
              <img
                className="inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                src={data.hero_image}
                alt=""
              />
            </div>
            {data.extra_images
              .filter((_: any, i: any) => i >= 1 && i < 5)
              .map((item: any, index: any) => (
                <div
                  key={index}
                  className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                    index >= 3 ? "hidden sm:block" : ""
                  }`}
                >
                  <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                    <img
                      className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                      src={item || ""}
                      alt=""
                      sizes="400px"
                    />
                  </div>
                </div>
              ))}

            <button
              className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
              onClick={handleOpenModalImageGallery}
            >
              <Squares2X2Icon className="w-5 h-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </button>
          </div>
          <p>Allowed Players: {data.sport_id.allowed_players}</p>
          <p>
            <p className="text-lg font-semibold"> Description:</p>{" "}
            <div>{data.description}</div>
          </p>
          <p>
            <p className="text-lg font-semibold">Policy:</p>{" "}
            <div>{data.policy}</div>
          </p>
        </div>
      </>
    );
  };

  const location = useLocation();

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

  useEffect(() => {
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

  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);

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
        {filteredData.sports && (
          <div className="listingSectionSidebar__wrap p-4">
            <p>Select a Date</p>
            <FlightDateRangeInput
              onchange={(e) =>
                setFilteredData((prev) => ({ ...prev, date: e }))
              }
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
              onChange={(e) =>
                setFilteredData((prev) => ({ ...prev, time: e }))
              }
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
            {filteredData.date &&
              filteredData.duration &&
              filteredData.time && (
                <>
                  <p>Select your preferred Court</p>
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3">
                    {data.courts.map((d: any) => (
                      <>
                        <div className="flex justify-between">
                          {d.court_name}
                          <button
                            onClick={() =>
                              filteredData.courts.includes(d.court_code)
                                ? setFilteredData((prev) => {
                                    let index = filteredData.courts.indexOf(
                                      d.court_code
                                    );
                                    if (index !== -1) {
                                      filteredData.courts.splice(index, 1);
                                    }

                                    return {
                                      ...prev,
                                      courts: [...prev.courts],
                                    };
                                  })
                                : setFilteredData((prev) => {
                                    prev.courts.push(d.court_code);
                                    return {
                                      ...prev,
                                      courts: [...prev.courts],
                                    };
                                  })
                            }
                            className={`border text-[blue] text-xs px-2 py-1 border-[blue] rounded-md ${
                              filteredData.courts.includes(d.court_code)
                                ? "bg-[blue] text-[white]"
                                : ""
                            }`}
                          >
                            {filteredData.courts.includes(d.court_code)
                              ? "Added"
                              : "Add"}
                          </button>
                        </div>
                        <div className="h-[1px] bg-neutral-200 dark:bg-neutral-700 my-3"></div>
                      </>
                    ))}
                  </div>
                </>
              )}
            {data.courts.filter((d: any) => {
              return filteredData.courts.includes(d.court_code);
            }).length > 0 && (
              <>
                <div>Selected Court</div>
                <div>
                  {data.courts
                    .filter((d: any) => {
                      return filteredData.courts.includes(d.court_code);
                    })
                    .map((d: any) => (
                      <div className="flex justify-between">
                        <p>{d.court_code}</p>
                        <MinusCircleIcon
                          color="red"
                          className="w-5 cursor-pointer"
                          onClick={() =>
                            setFilteredData((prev) => {
                              let index = filteredData.courts.indexOf(
                                d.court_code
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
        )}
        <ButtonPrimary
          onClick={() => {
            console.log(filteredData);
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

            if (loginState.isLoggedIn) {
              navigate(
                `/checkout/${
                  routers.pathname.split("/")[
                    routers.pathname.split("/").length - 1
                  ]
                }?${queryParams}`
              );
            } else {
              setLoginModal(true);
            }
          }}
        >
          Reserve
        </ButtonPrimary>
      </div>
    );
  };

  return (
    <div className="nc-ListingStayDetailPage">
      {/*  HEADER */}
      <header className="rounded-md sm:rounded-xl">
        <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div
            className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer "
            onClick={handleOpenModalImageGallery}
          >
            <img
              className="inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
              src={data.hero_image}
              alt=""
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </div>
          {data.extra_images
            .filter((_: any, i: any) => i >= 1 && i < 5)
            .map((item: any, index: any) => (
              <div
                key={index}
                className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                  index >= 3 ? "hidden sm:block" : ""
                }`}
              >
                <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                  <img
                    className="absolute inset-0 object-cover rounded-md sm:rounded-xl w-full h-full"
                    src={item || ""}
                    alt=""
                    sizes="400px"
                  />
                </div>

                {/* OVERLAY */}
                <div
                  className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={handleOpenModalImageGallery}
                />
              </div>
            ))}

          <button
            className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={handleOpenModalImageGallery}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>
      </header>

      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection4()}
          {renderSection5()}
          <p className="text-3xl font-semibold">Courts</p>
          {data.courts.map((d: any) => renderSection6(d))}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
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

export default function ListingStayDetailPage() {
  const [data, setData] = useState();
  const router = useLocation();
  const id = router.pathname.split("/")[router.pathname.split("/").length - 1];
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/venue/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setSports(res.data.courts.map((d: any) => d.sport_id.name));
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setLoading(false);
      });
  }, [id]);

  return (
    <DetailPagetLayout>
      {data && <StayDetailPageContainer data={data} sports={sports} />}
      {loading && <CustomLoader />}
    </DetailPagetLayout>
  );
}
