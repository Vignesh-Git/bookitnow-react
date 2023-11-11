import FlightDateRangeInput from "components/HeroSearchForm/(flight-search-form)/FlightDateRangeInput";
import DurationInput from "components/HeroSearchForm/DurationInput";
import LocationInput from "components/HeroSearchForm/LocationInput";
import SportInput from "components/HeroSearchForm/SportInput";
import TimeInput from "components/HeroSearchForm/TimeInput";

const FlightSearchForm = () => {
  return (
    <div>
      <div className="w-full space-y-5 ">
        <LocationInput
          placeHolder="Venue"
          desc="Where do you want to play?"
          className="flex-1"
        />
        <SportInput
          placeHolder="Sport"
          desc="What do you want to play?"
          className="flex-1"
          divHideVerticalLineClass=" -inset-x-0.5"
        />
        <FlightDateRangeInput className="flex-1" />
        <TimeInput
          placeHolder="Time"
          desc="At what time?"
          className="flex-1"
          divHideVerticalLineClass=" -inset-x-0.5"
        />
        <DurationInput
          placeHolder="Duration"
          desc="How long?"
          className="flex-1"
          divHideVerticalLineClass=" -inset-x-0.5"
        />
      </div>
    </div>
  );
};

export default FlightSearchForm;
