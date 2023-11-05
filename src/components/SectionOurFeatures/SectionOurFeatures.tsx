import React, { FC } from "react";
import rightImgPng from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          Our Features
        </span>
        <h2 className="font-semibold text-4xl mt-5">Find, Book, Play, Repeat</h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Find venue" />
            <span className="block text-xl font-semibold">
              Find among venues
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
            A comprehensive database of sports venues, including stadiums, fields, gyms, and more. 
            Integration with maps for easy navigation to the venue, making it convenient for you to find your desired location.
            </span>
          </li>
          
          <li className="space-y-4">
            <Badge color="red" name="Book court" />
            <span className="block text-xl font-semibold">
            Book and Reserve it
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
            You can easily book venues for one-time events or recurring activities. 
            Real-time availability and pricing information streamline the reservation process.
            </span>
          </li>

          <li className="space-y-4">
            <Badge color="green" name="Play joyfully" />
            <span className="block text-xl font-semibold">
            Play and relax
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
            Access to facilities with specialized equipments includes safety and security at your convenient time.
            Playfully Play fully.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
