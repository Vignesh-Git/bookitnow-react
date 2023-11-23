import React, { Fragment, useEffect, useState } from "react";
import StartRating from "components/StartRating/StartRating";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import LikeSaveBtns from "components/LikeSaveBtns";
import SectionDateRange from "../SectionDateRange";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { useLocation, useNavigate } from "react-router-dom";
import { Amenities_demos, PHOTOS } from "./constant";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRightIcon,
  ChartBarIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import ButtonClose from "shared/ButtonClose/ButtonClose";
import ButtonCircle from "shared/Button/ButtonCircle";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import DetailPagetLayout from "../Layout";
import GuestsInput from "./GuestsInput";
import axios from "axios";
import { toast } from "react-toastify";

const StayDetailPageContainer = ({ data }: { data: any }) => {
  //

  let [isOpenModalPricing, setIsOpenModalPricing] = useState(false);

  const thisPathname = useLocation().pathname;
  const router = useNavigate();

  const handleOpenModalImageGallery = () => {
    router(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE`);
  };

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
        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            <i className=" las la-user text-2xl "></i>
            <span className="">
              {data.courts.length}{" "}
              <span className="hidden sm:inline-block">Courts</span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        <h2 className="text-2xl font-semibold">Court information</h2>
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

  const renderMotalPricing = () => {
    return (
      <Transition appear show={isOpenModalPricing} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setIsOpenModalPricing(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose
                        onClick={() => setIsOpenModalPricing(false)}
                      />
                    </span>
                  </div>
                  <div className="px-8 mt-4 overflow-auto text-neutral-700 dark:text-neutral-300">
                    {data.courts.map((d: any) => (
                      <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 mb-5">
                        <div className="flex gap-4 items-center">
                          <ChartBarIcon className="w-7 h-7" />
                          {d.court_id.name}
                        </div>
                        <div className="w-20 border-b my-3 border-neutral-200 dark:border-neutral-700"></div>

                        <p>
                          {Object.entries(d.price).map((price: any) => {
                            if (price[0] !== "_id") {
                              return (
                                <>
                                  {price[1].length > 0 && (
                                    <p>
                                      <div className="capitalize">
                                        {" "}
                                        {price[0]}
                                      </div>
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
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
        <div
          className="listingSection__wrap cursor-pointer"
          onClick={() => setIsOpenModalPricing(true)}
        >
          {/* HEADING */}
          <div>
            <h2 className="text-2xl font-semibold">Pricing</h2>
          </div>
        </div>
        {renderMotalPricing()}
      </>
    );
  };
  const renderSection6 = (data: any) => {
    console.log(data);
    return (
      <>
        <div className="listingSection__wrap cursor-pointer">
          <div>
            <h2 className="text-2xl font-semibold">{data.court_id.name}</h2>
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
          <p>Allowed Players: {data.court_id.allowed_players}</p>
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

  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        {/* PRICE */}
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            $119
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /night
            </span>
          </span>
          <StartRating />
        </div>

        {/* FORM */}
        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl ">
          <StayDatesRangeInput className="flex-1 z-[11]" />
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <GuestsInput className="flex-1" />
        </form>

        {/* SUM */}
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>$119 x 3 night</span>
            <span>$357</span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>$0</span>
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>$199</span>
          </div>
        </div>

        {/* SUBMIT */}
        <ButtonPrimary href={"/checkout"}>Reserve</ButtonPrimary>
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
    </div>
  );
};

export default function ListingStayDetailPage() {
  const [data, setData] = useState();
  const router = useLocation();
  const id = router.pathname.split("/")[router.pathname.split("/").length - 1];
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/venue/${id}`)
      .then((res) => setData(res.data))
      .catch(() => toast.error("Something went wrong!"));
  }, []);
  return (
    <DetailPagetLayout>
      {data && <StayDetailPageContainer data={data} />}
    </DetailPagetLayout>
  );
}
