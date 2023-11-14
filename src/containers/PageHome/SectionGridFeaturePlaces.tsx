import React, { FC, ReactNode, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "data/listings";
import { StayDataType } from "data/types";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import StayCard from "components/StayCard/StayCard";
import axios, { isCancel, AxiosError } from 'axios';
import { toast } from "react-toastify";
import FeaturedVenueCard from "components/FeaturedVenueCard/FeaturedVenueCard";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 4);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  


  
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured Venues",
  subHeading = "Popular venues with every facilities. Almost everything",
  headingIsCenter = true,
  tabs = ["Badminton", "Bowling", "Swimming", "Athelete"],
}) => {

  const [featuredVenues, setFeaturedVenues] = useState([])

  useEffect(()=>{

    if(!featuredVenues.length){
      axios.get(`${process.env.REACT_APP_API_DOMAIN}/api/venue/get_featured_venues`).then((response)=>{
        console.log(response)
        setFeaturedVenues(response.data)
      }).catch((e)=>{
      toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT
        })
      })
    }

  }, [featuredVenues, featuredVenues.length])


  const renderCard = (venue: any) => {
    return <FeaturedVenueCard key={venue._id} data={venue} />;
  };

  return (
    <div className="nc-SectionGridFeaturePlaces relative" id={'FeaturedVenues'}>
      <HeaderFilter
        tabActive={"Badminton"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={() => {}}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {featuredVenues.map((venue) => renderCard(venue))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
