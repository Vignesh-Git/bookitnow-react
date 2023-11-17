import React, { FC, useState } from "react";
import ButtonPrimary from "../../shared/Button/ButtonPrimary";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import axios from "axios";
import { toast } from "react-toastify";

export interface StayCardProps {
  data?: {
    hero_image: string;
    name: string;
    _id: string;
    description: string;
    address: any;
  };
  callBack?: any;
}

const VenueCard: FC<StayCardProps> = ({ data, callBack }) => {
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <img src={data?.hero_image} className="w-full h-[200px]" />
      </div>
    );
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`${process.env.REACT_APP_API_DOMAIN}/api/venue/${id}`)
      .then(() => {
        toast.success("Deleted Successfully");
        callBack();
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  const renderContent = () => {
    return (
      <div className={"p-3 space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2 className={` font-medium capitalize ${"text-base"}`}>
              <span className="line-clamp-1">{data?.name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            <span className="">{data?.description}</span>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            <span className="">
              {data?.address.city},{data?.address.country}
            </span>
          </div>
        </div>
        <div className="w-100 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <ButtonSecondary onClick={() => data?._id && handleDelete(data?._id)}>
            Delete
          </ButtonSecondary>
          <ButtonPrimary href={`/create?id=${data?._id}`}>Edit</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow `}
      data-nc-id="StayCard"
    >
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default VenueCard;
