import Tables from "components/Tables";
import React from "react";
import Input from "shared/Input/Input";

function ManageBooking() {
  return (
    <div className="container p-5">
      <h5 className="text-[25px] font-medium my-5">Manage Booking</h5>
      <div className="flex justify-end ">
        <Input placeholder="Search" id="Search" className="w-[320px] mb-4 " />
      </div>
      <div className="relative overflow-x-auto">
        <Tables />
      </div>
    </div>
  );
}

export default ManageBooking;
