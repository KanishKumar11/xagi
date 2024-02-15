"use client";
import React, { useEffect } from "react";
import { FaIdeal } from "react-icons/fa6";
import { fetchCompetition } from "./fetchData";
var data = [];
const Competition = () => {
  const dataFetch = async () => {
    console.log("competition");
    data = await fetchCompetition(
      "an app that delivers in food items in 10 minutes"
    );
    console.log(data);
  };
  dataFetch();

  return (
    <div className="rounded-[50px] bg-white p-14">
      <div className="mb-4 flex items-center gap-3  text-2xl font-bold">
        <div className="rounded-full bg-[#f4f5f6] p-4 ">
          <FaIdeal />
        </div>
        <h2>Competition</h2>
      </div>
      <div>
        {/* {data.map((item, index) => (
          <div key={index}>{item.name}</div>
        ))} */}
      </div>
    </div>
  );
};

export default Competition;
