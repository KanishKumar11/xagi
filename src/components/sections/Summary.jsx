"use client";
import React, { useEffect, useState } from "react";
import { GrTextWrap } from "react-icons/gr";
import { fetchSummary } from "./fetchData";
var data;
const Summary = () => {
  const [sum, setSum] = useState("a");
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchSummary(
        "https://indtech.in/how-to-download-royalty-free-music-for-free/"
      );
      console.log("summa");
      console.log(result);
      setSum(result);
    };

    fetchData();
  }, []);
  return (
    <div className="rounded-[50px] bg-white p-14">
      <div className="mb-4 flex items-center gap-3 text-2xl font-bold">
        <div className="rounded-full bg-[#f4f5f6] p-4 ">
          <GrTextWrap />
        </div>
        <h2>Summary</h2>
      </div>
      <div>{sum}</div>
    </div>
  );
};

export default Summary;
