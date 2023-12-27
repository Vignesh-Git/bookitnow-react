import { Dialog, Transition } from "@headlessui/react";
import {
  ClockIcon,
  EyeIcon,
  HandThumbUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import CustomLoader, { Loader } from "components/CustomLoader";
import Tables from "components/Tables";
import FormItem from "containers/PageAddListing1/FormItem";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";

function ManageBooking() {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    GetAll();
  }, []);
  const [Body, setBody] = useState([]);

  const GetAll = () => {
    setLoader(true);
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/api/booking/get_all`)
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
  };

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
          <button
            className="cursor-pointer"
            onClick={() =>
              setShowModal((prev) => ({
                ...prev,
                isOpen: true,
                id: a,
              }))
            }
          >
            Add Remark
          </button>
        </>
      ),
    },
  ];

  const handleRemarks = (bookingId: string, data: any) => {
    setLoader(true);
    axios
      .put(`${process.env.REACT_APP_API_DOMAIN}/api/booking/${bookingId}`, data)
      .then((res) => {
        closeModal();
        setLoader(false);
        GetAll();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        closeModal();
      });
  };

  const [showModal, setShowModal] = useState({
    isOpen: false,
    remark: "",
    status: "",
    id: "",
  });

  const closeModal = () => {
    setShowModal({
      isOpen: false,
      remark: "",
      status: "",
      id: "",
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
          <Tables Heading={Heading} Body={Body} />
        )}
      </div>
      <Transition appear show={showModal.isOpen} as={Fragment}>
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
                <Dialog.Panel className="relative h-full overflow-hidden flex-1 flex flex-col justify-center ">
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
                  <div className="flex flex-col w-[660px] gap-3 justify-center m-auto">
                    <h1 className="text-xl font-semibold">Add Remarks</h1>
                    <FormItem label="Remarks">
                      <Textarea
                        placeholder="..."
                        id="desc"
                        name="desc"
                        onChange={(e) =>
                          setShowModal((prev) => ({
                            ...prev,
                            isOpen: true,
                            remark: e.target.value,
                          }))
                        }
                        value={showModal.remark}
                      />
                    </FormItem>
                    <FormItem label="Status">
                      <select
                        onChange={(e) =>
                          setShowModal((prev) => ({
                            ...prev,
                            isOpen: true,

                            status: e.target.value,
                          }))
                        }
                        value={showModal.status}
                      >
                        <option value={""}>Select any</option>

                        {[
                          "pending",
                          "approved",
                          "rejected",
                          "expired",
                          "cancelled",
                        ].map((d) => (
                          <option value={d}>{d}</option>
                        ))}
                      </select>
                    </FormItem>
                    <div className="flex justify-end gap-5">
                      <ButtonSecondary onClick={closeModal}>
                        Close
                      </ButtonSecondary>

                      <ButtonPrimary
                        onClick={() =>
                          handleRemarks(showModal.id, {
                            remarks: showModal.remark,
                            status: showModal.status,
                          })
                        }
                      >
                        Submit
                      </ButtonPrimary>
                      {loader && <CustomLoader />}
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
}

export default ManageBooking;
