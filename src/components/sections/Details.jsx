import React from "react";
import { BsBuildingsFill } from "react-icons/bs";
const Funds = [
  {
    title: "Remaining Funds",
    value: "$28,500,000/",
    tVal: "$30,000,000",
  },
  {
    title: "Capital Deployed",
    value: "$1,500,000",
  },
  {
    title: "Projects",
    value: "6",
  },
  {
    title: "LPs",
    value: "61",
  },
];
const Details = () => {
  return (
    <div className="relative max-w-6xl rounded-[50px] bg-white  p-10 py-12">
      <div className="flex items-center gap-3 text-lg font-bold  md:text-2xl">
        <div className="mB-4 rounded-full bg-[#f4f5f6] p-4">
          <BsBuildingsFill />
        </div>
        <h2>Bankless Ventures Overview</h2>
      </div>
      <div className="w-full">
        <div className="mt-4  flex w-full flex-wrap gap-5 text-lg font-medium capitalize md:flex-nowrap">
          {Funds.map((item, index) => (
            <div
              key={index}
              className={` col-span-${
                index === 0 ? "6" : "3"
              } flex min-w-[115px] max-w-max flex-col items-center justify-between text-center ${
                index <= 2 && "md:border-r"
              } border-gray-300 px-5`}
            >
              <div className="mx-auto flex items-center text-center leading-10 ">
                <span className="text-sm text-gray-400 md:text-lg">
                  {item.title}
                </span>
              </div>
              <div className="text-wrap text-base font-bold text-black md:text-2xl">
                {item.value}
                <span className="text-sm font-normal text-gray-400 md:text-lg">
                  &nbsp;{item.tVal}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
