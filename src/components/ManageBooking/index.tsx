import Tables from "components/Tables";
import React from "react";
import Input from "shared/Input/Input";

function ManageBooking() {
  return (
    <div className="p-5">
      <div className="flex justify-end w-full">
        <Input placeholder="Search" id="Search" className="mb-4 w-[270px]" />
      </div>
      <div className="relative overflow-x-auto">
        <Tables />
      </div>
    </div>
  );
}

export default ManageBooking;
