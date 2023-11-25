import FlightDateRangeInput from "components/HeroSearchForm/(flight-search-form)/FlightDateRangeInput";
import DurationInput from "components/HeroSearchForm/DurationInput";
import LocationInput from "components/HeroSearchForm/LocationInput";
import SportInput from "components/HeroSearchForm/SportInput";
import TimeInput from "components/HeroSearchForm/TimeInput";
import { useState } from "react";
import { IData } from "../HeroSearchForm2Mobile";

const FlightSearchForm = ({
  data,
  setData,
}: {
  data: IData;
  setData: React.Dispatch<React.SetStateAction<IData>>;
}) => {
  return (
    <div>
      <div className="w-full space-y-5 ">
        <LocationInput
          placeHolder="Venue"
          desc="Where do you want to play?"
          className="flex-1"
          onchange={(e) => setData((prev) => ({ ...prev, location: e }))}
          value={data.location}
        />
        <SportInput
          placeHolder="Sport"
          desc="What do you want to play?"
          className="flex-1"
          divHideVerticalLineClass=" -inset-x-0.5"
          onchange={(e) => setData((prev) => ({ ...prev, sports: e }))}
          value={data.sports}
        />
        <FlightDateRangeInput
          className="flex-1"
          selectsRange={false}
          onchange={(e) => setData((prev) => ({ ...prev, date: e }))}
          value={data.date}
        />
        <TimeInput
          placeHolder="Time"
          desc="At what time?"
          className="flex-1"
          divHideVerticalLineClass=" -inset-x-0.5"
          onChange={(e) => setData((prev) => ({ ...prev, time: e }))}
          value={data.time}
        />
        <DurationInput
          placeHolder="Duration"
          desc="How long?"
          className="flex-1"
          divHideVerticalLineClass=" -inset-x-0.5"
          onchange={(e) => setData((prev) => ({ ...prev, duration: e }))}
          value={data.duration}
        />
      </div>
    </div>
  );
};

export default FlightSearchForm;
