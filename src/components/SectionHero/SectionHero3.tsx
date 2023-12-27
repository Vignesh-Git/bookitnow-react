import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";

export interface SectionHero3Props {
  className?: string;
  imagePng?: string;
  tagLine?: string;
}

const SectionHero3: FC<SectionHero3Props> = ({
  className = "",
  imagePng,
  tagLine,
}) => {
  return (
    <div
      className={`nc-SectionHero3 relative ${className}`}
      data-nc-id="SectionHero3"
    >
      <div className="absolute z-10 inset-x-0 top-[10%] sm:top-[15%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
        <span className="sm:text-lg md:text-xl font-semibold text-neutral-900">
          Bookitnow
        </span>
        <h2 className="font-bold text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%] ">
          {tagLine}
        </h2>
        <ButtonPrimary
          sizeClass="px-6 py-3 lg:px-8 lg:py-4 rounded-xl"
          fontSize="text-sm sm:text-base lg:text-lg font-medium"
          href={"/filtered-venue"}
        >
          Explore more
        </ButtonPrimary>
      </div>
      <div className="relative aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8 ">
        <img
          className="absolute inset-0 object-cover rounded-xl"
          src={imagePng}
          alt="hero"
        />
      </div>
    </div>
  );
};

export default SectionHero3;
