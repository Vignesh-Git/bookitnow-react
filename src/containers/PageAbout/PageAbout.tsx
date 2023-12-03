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
                BookItNow began as a simple solution to a decades-long problem:
                sports players found it hard to locate and reserve sports
                facilities, and venue operators needed more efficient ways to
                streamline booking processes. Our self-service booking and
                facility automation platform has now made an operational
                difference for over 200,000 players across more than 1,000
                different sports spaces, and counting, who now trust BookItNow
                for their sports reservations.
              </p>
              <p className="mt-3">
                Having addressed obvious gaps in our sports environment, we now
                set our sights beyond just improving pain points to elevating
                the sports ecosystem as a whole. Our robust data on sports
                individuals and business trends, resource and inventory
                management, automation, reservation technologies, and community
                management are primed for further evolution.
              </p>
              <p className="mt-3">
                As a leading sports technology company, we aim to pave the way
                for groundbreaking initiatives by fostering a vibrant network of
                players, businesses, and innovators to collaborate and build
                upon our strengths, advancing the sports ecosystem together.
              </p>
            </p>
          }
        />
        <div>
          <div className="flex items-center h-[430px]  flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 mx-auto  ">
              <h1 className="text-2xl font-bold">Our Vision</h1>
              <p className="mt-10 block text-base  text-neutral-6000 dark:text-neutral-400">
                To be the leading technology partner in the region for fostering
                sports collaboration and facilitating the growth of the sports
                ecosystem.
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
              We aspire to be the biggest supporters of sports! With our sports
              technology and a strong can-do sporting spirit, here are three
              things to which we are wholeheartedly committed:
              <ul className="list-disc	p-3">
                <li> Getting people to play more sports by </li>
                <li>
                  Connecting more players, businesses and communities with our
                  technology
                </li>
                <li> For the growth of the sports ecosystem</li>
              </ul>
            </p>
          </div>
        </div>
        <div className="flex gap-10 w-full lg:flex-row flex-col-reverse items-center ">
          <div className="bg-value-img w-full lg:w-[48%] bg-contain bg-no-repeat h-[430px]"></div>
          <div className="lg:w-1/2 w-full">
            <h1 className="text-2xl font-bold">Our Values</h1>
            <p className="block text-base  text-neutral-6000 dark:text-neutral-400">
              We aspire to be the biggest supporters of sports! With our sports
              technology and a strong can-do sporting spirit, here are three
              things to which we are wholeheartedly committed:
              <ul className="list-disc	p-3">
                <li> Getting people to play more sports by </li>
                <li>
                  Connecting more players, businesses and communities with our
                  technology
                </li>
                <li> For the growth of the sports ecosystem</li>
              </ul>
            </p>
          </div>
        </div>
        <SectionFounder />

        <SectionStatistic />
      </div>
    </div>
  );
};

export default PageAbout;
