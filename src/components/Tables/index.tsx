import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  ClockIcon,
  EyeIcon,
  HandThumbUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import CustomLoader from "components/CustomLoader";
import FormItem from "containers/PageAddListing1/FormItem";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Input from "shared/Input/Input";
import Textarea from "shared/Textarea/Textarea";

function Tables({ data, callBack }: { data: any; callBack?: any }) {
  const [Body, setBody] = useState([]);
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
  useEffect(() => {
    setBody(
      data.map((d: any) => ({
        name: d.court_id,
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
  }, [data]);

  const Heading = [
    {
      title: "Court Name",
      index: "name",
      render: (a: any) => (
        <div className="flex gap-3">
          <div className="w-16 rounded-lg h-16 bg-[grey]"></div>
          <h5 className="text-[16px] font-medium my-2 text-[black] dark:text-[white]">
            {a}
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
  const [loader, setLoader] = useState(false);
  const handleRemarks = (bookingId: string, data: any) => {
    setLoader(true);
    axios
      .put(`${process.env.REACT_APP_API_DOMAIN}/api/booking/${bookingId}`, data)
      .then((res) => {
        closeModal();
        setLoader(false);
        callBack && callBack();
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        closeModal();
      });
  };
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {Heading.map((head) => (
            <th scope="col" className="px-6 py-3">
              {head.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Body.map((bdy) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {Object.entries(bdy).map((cnt, idx) => (
              <td className="px-6 py-4">
                {Heading.find((a) => a.index === cnt[0])?.render(cnt[1])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
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
    </table>
  );
}

export default Tables;
