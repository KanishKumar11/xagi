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
    <div className="bg-white rounded-[50px] p-10 py-12  relative max-w-6xl">
      <div className="text-2xl font-bold flex items-center  gap-3">
        <div className="bg-[#f4f5f6] p-4 rounded-full mB-4">
          <BsBuildingsFill />
        </div>
        <h2>Bankless Ventures Overview</h2>
      </div>
      <div>
        <div className="flex justify-between items-center mt-4 text-lg font-medium capitalize">
          {Funds.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-between text-center ${
                index <= 2 && "border-r"
              } border-gray-300 px-5 w-full`}
            >
              <div className="flex leading-10 items-center text-center mx-auto ">
                <span className="text-gray-400 text-lg">{item.title}</span>
              </div>
              <div className="text-2xl text-black font-bold">
                {item.value}
                <span className="text-gray-400 text-lg font-normal">
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
