import React from "react";
import DealForm from "../sections/DealForm";
import Summary from "../sections/Summary";
import NewsMentions from "../sections/NewsMentions";
import Competition from "../sections/Competition";

const AddANewDeal = () => {
  return (
    <div className="grid grid-cols-12 p-10 gap-20">
      <div className="col-span-6">
        <DealForm />
      </div>
      <div className="col-span-6 flex flex-col gap-20">
        <Summary />
        <NewsMentions />
        <Competition />
      </div>
    </div>
  );
};

export default AddANewDeal;
