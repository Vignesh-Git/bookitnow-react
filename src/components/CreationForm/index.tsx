import React, { useEffect, useState } from "react";
import VenueCreationForm from "./VenueCreationForm";
import CourtCreationForm from "./CourtCreationForm";

function CreationForm() {
  const [count, setCount] = useState(2);
  const [data, setData] = useState();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      {count === 1 ? (
        <VenueCreationForm
          onChange={(e: any) => {
            setData((prev: any) => ({ ...prev, e }));
            setCount(2);
          }}
        />
      ) : (
        <CourtCreationForm
          onSubmit={(e: any) =>
            setData((prev: any) => ({ ...prev, courts: e }))
          }
        />
      )}
    </div>
  );
}

export default CreationForm;
