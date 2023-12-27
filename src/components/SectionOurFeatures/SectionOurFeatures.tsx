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
        type === "type1" ? "lg:flex-row" : "lg:flex-row"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          Our Courts
        </span>
        <h2 className="font-semibold text-4xl mt-5">
          Find, Book, Play, Repeat
        </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="MULTI_PURPOSE HALL" />
            <span className="block text-xl font-semibold">ONCIDIUM HALL</span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Oncidium Hall has transformed into a vibrant multi-purpose venue,
              ideal for weddings, corporate events, and community gatherings.
              The hall seamlessly combines aesthetics and functionality,
              featuring integrated advanced audiovisual sustems and flexible
              seating.
            </span>
          </li>

          <li className="space-y-4">
            <Badge color="red" name="SPORTS FACILITIES" />
            <span className="block text-xl font-semibold">
              Wembley Futsal Arena
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Within the well-designed confines of wembley Futsal Arena,
              revamped by Majmuk Wira, you'll find a dynamic and inclusive space
              meticulously crafted to serve the needs of both futsal entusiasts
              and event organisers.
            </span>
          </li>

          <li className="space-y-4">
            <Badge color="green" name="SPORTS FACILITIES" />
            <span className="block text-xl font-semibold">
              Andalas Sports Complex
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Andalas Sports Complex has been refurboshed to offer a modern and
              inviting atmosphere for badminton athletes and enthusiasts.
              Creating an ideal environment for players to fully enjoy their
              games, it features enhanced flooring, advanced lighting, and
              improved ventilation.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="MULTI-PURPOSE HALL" />
            <span className="block text-xl font-semibold">
              Dewan Serbaguna MSBJ PU7
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Dewan Serbaguna MBSJ PU7 is rejuvenated into a versatile and
              adaptable venue accommodating various events, including corporate
              conferences, weddings, and cultural performances. We've also
              upgraded the parking facilities to enhance convenience.
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="SPORTS FACILITIES" />
            <span className="block text-xl font-semibold">
              Setua Alam Badminton Arena
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              We've executed a sophisticated redesign for setia Alam badminton
              Arena that seamlessly integrates aesthetics and functionality. The
              court's surface has been carefully polished, and the spectator
              seating thoughtfully designed to enhance both aspects.
            </span>
          </li>
        </ul>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionOurFeatures;
