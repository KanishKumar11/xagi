import React from "react";
import { BsRobot } from "react-icons/bs";
import { Input } from "../ui/input";

const AiAnalystBot = () => {
  return (
    <div className="relative max-w-6xl rounded-[50px] bg-white  p-10 py-12">
      <div className="flex items-center gap-3 text-2xl  font-bold">
        <div className="mB-4 rounded-full bg-[#f4f5f6] p-4">
          <BsRobot />
        </div>
        <h2>Ai Analyst bot</h2>
      </div>
      <div className="my-10">
        <div className=" message-orange">
          <p className="text-sm">Where are we at with the Ion deal?</p>
        </div>
        <div className=" message-blue">
          <p className="text-sm">Coming Soon!</p>
        </div>
      </div>
      <div>
        <Input
          placeholder="Ask me anything!"
          className=" rounded-3xl border-none bg-gray-100 py-7 text-gray-600 outline-none placeholder:font-bold"
        />
      </div>
    </div>
  );
};

export default AiAnalystBot;
