"use client";
import React, { useState } from "react";
import DealForm from "../sections/DealForm";
import Summary from "../sections/Summary";
import NewsMentions from "../sections/NewsMentions";
import Competition from "../sections/Competition";

const AddANewDeal = () => {
  const [brand, setBrand] = useState(null);
  const [link, setLink] = useState(null);
  const [desc, setDesc] = useState(null);
  const handleBrandChange = (newBrand) => {
    setBrand(newBrand.title);
    setLink(newBrand.website);
    setDesc(newBrand.description);
  };

  return (
    <div className="flex grid-cols-12 flex-col gap-20 p-2 lg:grid lg:p-10">
      <div className=" lg:col-span-6">
        <DealForm onBrandChange={handleBrandChange} />
      </div>
      <div className="col-span-12 flex flex-col gap-20 lg:col-span-6">
        <Summary links={link} tldr={desc} />
        <NewsMentions name={brand} />
        <Competition desc={desc} />
      </div>
    </div>
  );
};

export default AddANewDeal;
