import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import sliderImage1 from "images/c1.jpg";
import sliderImage2 from "images/c2.jpg";
import sliderImage3 from "images/c3.jpg";
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
      <GallerySlider
        uniqueID="sd"
        ratioClass=" h-[620px]"
        autoPlay={3000}
        componentList={[
          <SectionHero3
            imagePng={sliderImage1}
            tagLine="Book Your Victory Venue with Ease!"
          />,
          <SectionHero3
            imagePng={sliderImage2}
            tagLine="Your Game, Your Venue, Your Victory!"
          />,
          <SectionHero3
            imagePng={sliderImage3}
            tagLine="Score Your Perfect Game Day"
          />,
        ]}
      />

      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
        <HeroSearchForm />
      </div>
    </div>
  );
};

export default SectionHero;
