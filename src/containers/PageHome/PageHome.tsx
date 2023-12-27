import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React, { useEffect } from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";
import GallerySlider from "components/GallerySlider/GallerySlider";
import SectionHero3 from "components/SectionHero/SectionHero3";
import ResultGridFeature from "./ResultGridFeature";
import CustomLoader from "components/CustomLoader";

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Court Rent",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://www.logisticsinsider.in/wp-content/uploads/2022/04/stadium-one-runner-scaled.jpg",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Group Lesson",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://experiencelife.lifetime.life/wp-content/uploads/2021/03/Sports.jpg",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Training Program",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://media.self.com/photos/61bcd0e05aed92fc4251b026/4:3/w_4946,h_3709,c_limit/GettyImages-1213234926.jpeg",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Private Lessons",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://m.economictimes.com/thumb/msid-77734860,width-1200,height-900,resizemode-4,imgsize-951020/sports_istock.jpg",
  },

  {
    id: "2",
    href: "/listing-stay",
    name: "Tournaments",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://m.economictimes.com/thumb/msid-77734860,width-1200,height-900,resizemode-4,imgsize-951020/sports_istock.jpg",
  },
];

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />
      <SectionHero />

      <div className="container mt-24 relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}

        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories
          categories={DEMO_CATS}
          uniqueClassName="PageHome_s1"
        /> */}

        <div className="relative py-16">
          <BackgroundSection />
          {/* <ResultGridFeature heading="Filtered Venues" /> */}
          <div className="my-10">
            <SectionGridFeaturePlaces />
          </div>
        </div>

        {/* SECTION2 */}

        {/* SECTION */}
        <SectionOurFeatures />

        {/* SECTION */}
        {/* <SectionHowItWork /> */}

        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div> */}

        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewCategories
            categories={DEMO_CATS}
            uniqueClassName="PageHome_services"
          />
        </div>

        {/* SECTION */}
        <SectionBecomeAnAuthor />

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}

        {/* SECTION */}
        {/* <SectionGridCategoryBox /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSubscribe2 />
        </div> */}

        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
          uniqueClassName="PageHome_s3"
        /> */}

        {/* SECTION */}
        {/* <SectionVideos /> */}

        {/* SECTION */}
      </div>
      {/* <CustomLoader /> */}
    </div>
  );
}

export default PageHome;
