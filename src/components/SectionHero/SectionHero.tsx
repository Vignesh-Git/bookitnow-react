import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import imagePng from "images/hero-right.png";
import HeroSearchForm from "components/HeroSearchForm/HeroSearchForm";
import GallerySlider from "components/GallerySlider/GallerySlider";
import SectionHero3 from "./SectionHero3";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
      data-nc-id="SectionHero"
    >
    
      {/* <GallerySlider
        uniqueID="sd"
        ratioClass=" h-[620px]"
        autoPlay={2000}
        componentList={[<SectionHero3 />]}
      /> */}

      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
        <HeroSearchForm />
      </div>
    </div>
  );
};

export default SectionHero;
