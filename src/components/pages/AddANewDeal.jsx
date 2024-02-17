"use client";
import React, { useEffect, useState } from "react";
import DealForm from "../sections/DealForm";
import Summary from "../sections/Summary";
import NewsMentions from "../sections/NewsMentions";
import Competition from "../sections/Competition";
import { useMobXStore } from "@/MobXProvider";

const AddANewDeal = () => {
  const store = useMobXStore();
  const [brand, setBrand] = useState("");
  const [link, setLink] = useState("");
  const [desc, setDesc] = useState("");
  // const brand = store.name;
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if (brand) setloading(false);
  }, [brand]);
  const handleBrandChange = (newBrand) => {
    setBrand(newBrand.title);
    setLink(newBrand.website);
    setDesc(newBrand.description);
  };

  return (
    <div className="grid grid-cols-12 gap-20 p-10">
      <div className="col-span-6">
        <DealForm onBrandChange={handleBrandChange} />
      </div>
      <div className="col-span-6 flex flex-col gap-20">
        <Summary links={link} tldr={desc} />
        <NewsMentions name={brand} />
        <Competition desc={desc} />
      </div>
    </div>
  );
};

export default AddANewDeal;
