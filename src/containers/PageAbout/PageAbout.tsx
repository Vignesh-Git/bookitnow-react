import rightImg from "images/AboutUs.jpg";
import React, { FC } from "react";
import SectionFounder from "./SectionFounder";
import SectionStatistic from "./SectionStatistic";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import SectionHero from "./SectionHero";

export interface PageAboutProps {
  className?: string;
}

const PageAbout: FC<PageAboutProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageAbout overflow-hidden relative ${className}`}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>About || Booking React Template</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading={
            <p>
              <p>
                Based in Klang Valley, our journey began in 2009 with a passsion
                for revitalising spaces tat were once forgottem, unloved, or
                simply in need of a fresh perspective. Over the years, we've
                honed our expertise refining our craft to become leaders in the
                art of property transformation.
              </p>
              <p className="mt-3">
                In the world og sports and events, we've witnessed the magic
                that happens when these spaces are reborn, rebranded, and
                reinvigorated , creating unforgettable experiencs for attendess
                and generating new revenue streams for our clients.
              </p>
            </p>
          }
        />
        <div>
          <div className="flex items-center h-[430px]  flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 mx-auto  ">
              <h1 className="text-2xl font-bold">Our Vision</h1>
              <p className="mt-10 block text-base  text-neutral-6000 dark:text-neutral-400">
                To stand as the foremost firm in real estate revitalization and
                rebranding and dedicated to reshape urban and suburban
                lasndscapes, cultivate vibrant, sustainbale communities, and
                redefine the future of real estate.
              </p>
            </div>
            <div className="w-1/2 w-full lg:w-1/2 mt-5 lg:mt-0 h-[430px] bg-hero-pattern bg-fixed bg-right-bottom	 bg-no-repeat		"></div>
          </div>
        </div>
        <div className="flex gap-10 w-full flex-col-reverse lg:flex-row items-center">
          <div className="bg-mission-img w-full lg:w-[48%] bg-fixed h-[430px]"></div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold">Our Mission</h1>
            <p className="block text-base  text-neutral-6000 dark:text-neutral-400">
              To catalyse positive change in real estate by specialising in
              property revitalization through:
              <ul className="list-disc	p-3">
                <li>
                  Breathing new life into properties, enhancing asethetics and
                  functionality.
                </li>
                <li>
                  Pioneerring sustainabke practics and eco-friendly
                  technologies.
                </li>
                <li>
                  Working closely with communities, fostering inclustivity.
                </li>
                <li>
                  Tailoring servies, ensuring transparency, and delivering
                  results with integrity.
                </li>
                <li>
                  Enhancing property value, contributing to market growth.
                </li>
                <li>
                  Identifying and addressing potential risks for long-term
                  success.
                </li>
              </ul>
            </p>
          </div>
        </div>
        <SectionStatistic />
      </div>
    </div>
  );
};

export default PageAbout;
