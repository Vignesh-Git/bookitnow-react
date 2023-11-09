import { Popover, Transition } from "@headlessui/react";
import {
  ClockIcon,
  EyeIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/solid";
import React, { Fragment } from "react";

function Tables() {
  const Heading = [
    {
      title: "Court Name",
      index: "name",
      render: (a: any) => (
        <div className="flex gap-3">
          <div className="w-16 rounded-lg h-16 bg-[grey]"></div>
          <h5 className="text-[14px] font-medium my-2 text-[black] dark:text-[white]">
            {a}
          </h5>
        </div>
      ),
    },
    {
      title: "Date & Time",
      index: "date",
      render: (a: any) => (
        <>
          <h5 className="text-[14px] my-2 text-[black] dark:text-[white]">
            {a.date}
          </h5>
          <h5 className="text-[14px] my-2 text-[black] dark:text-[white]">
            {a.slots}
          </h5>
        </>
      ),
    },
    {
      title: "Payment",
      index: "payment",

      render: (a: any) => (
        <h5 className="text-[14px] my-2 text-[black] dark:text-[white]">
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
            a === "Accepted"
              ? "bg-[green] text-[12px] text-green-200 p-1 rounded-md font-medium w-fit flex gap-2 items-center"
              : "bg-[red] text-[12px]  text-red-200 p-1 rounded-md font-medium w-fit flex gap-2 items-center"
          }
        >
          {a === "Accepted" ? (
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
        <div className="text-red-500 flex gap-1 text-[14px] cursor-pointer">
          <EyeIcon className="w-5 h-5" />
          View Details
        </div>
      ),
    },
    {
      title: "",
      index: "actions",
      render: () => (
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={`inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <EllipsisHorizontalCircleIcon className="w-8" />
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
                <Popover.Panel className="absolute z-10 w-screen max-w-[160px] px-1 mt-4 -right-10 sm:right-0 sm:px-0">
                  <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white dark:bg-neutral-800 p-5">
                      A
                    </div>
                    <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />

                    <div className="relative bg-white dark:bg-neutral-800 p-5">
                      A
                    </div>
                    <hr className="h-[1px] border-t border-neutral-300 dark:border-neutral-700" />

                    <div className="relative bg-white dark:bg-neutral-800 p-5">
                      A
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      ),
    },
  ];

  const Body = [
    {
      name: "Tennis Court",
      date: {
        date: "Mon,Jul 15",
        slots: "3:00 PM - 05:00 PM",
      },
      payment: "190",
      status: "Accepted",
      details: "",
      actions: "",
    },
    {
      name: "Football Court",
      date: {
        date: "Tue,Jul 26",
        slots: "3:00 PM - 05:00 PM",
      },
      payment: "210",
      status: "Awaited",
      details: "",
      actions: "",
    },
    {
      name: "Football Court",
      date: {
        date: "Tue,Jul 26",
        slots: "3:00 PM - 05:00 PM",
      },
      payment: "210",
      status: "Awaited",
      details: "",
      actions: "",
    },
    {
      name: "Football Court",
      date: {
        date: "Tue,Jul 26",
        slots: "3:00 PM - 05:00 PM",
      },
      payment: "210",
      status: "Awaited",
      details: "",
      actions: "",
    },
  ];
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
    </table>
  );
}

export default Tables;
