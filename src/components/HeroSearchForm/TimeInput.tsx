"use client";

import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  padding?: string;
  isShow?: string;
  onChange?: (a: string) => void;
  value?: string;
  caption?: boolean;
  availableTiming?: string[];
}
export const optionsList = [
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
  "12:00 AM",
  "12:30 AM",
  "01:00 AM",
  "01:30 AM",
  "02:00 AM",
  "02:30 AM",
  "03:00 AM",
  "03:30 AM",
  "04:00 AM",
  "04:30 AM",
  "05:00 AM",
  "05:30 AM",
  "06:00 AM",
  "06:30 AM",
];

const TimeInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  value,
  isShow,
  onChange,
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  padding,
  caption = true,
  availableTiming = optionsList,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showPopover, setShowPopover] = useState(autoFocus);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  const handleSelectLocation = (item: string) => {
    onChange && onChange(item);
    setShowPopover(false);
  };

  const renderRecentSearches = () => {
    return (
      <>
        <div className="mt-2">
          {availableTiming.map((item) => (
            <span
              onClick={() => handleSelectLocation(item)}
              key={item}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
              </span>
              <span className=" block font-medium text-neutral-700 dark:text-neutral-200">
                {item}
              </span>
            </span>
          ))}
        </div>
      </>
    );
  };

  const renderSearchValue = () => {
    return (
      <>
        {availableTiming.map((item) => (
          <span
            onClick={() => {
              handleSelectLocation(item);
              onChange && onChange(item);
            }}
            key={item}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span className="block text-neutral-400">
              <ClockIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {item}
            </span>
          </span>
        ))}
      </>
    );
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10  flex-1 relative flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
          showPopover ? "nc-hero-field-focused" : ""
        }  ${padding ? padding : " [ nc-hero-field-padding ]"}`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <ClockIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            readOnly={true}
            className={`block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate`}
            placeholder={placeHolder}
            value={value}
            autoFocus={showPopover}
            onChange={(e: any) => {
              onChange && onChange(e.currentTarget.value);
            }}
            ref={inputRef}
          />
          {caption && (
            <span className="block mt-0.5 text-sm text-neutral-400 font-light ">
              <span className="line-clamp-1">
                {!!value ? placeHolder : desc}
              </span>
            </span>
          )}
          {value && showPopover && (
            <ClearDataButton
              onClick={() => {
                onChange && onChange("");
              }}
            />
          )}
        </div>
      </div>

      {/* {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )} */}

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {value ? renderSearchValue() : renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default TimeInput;
