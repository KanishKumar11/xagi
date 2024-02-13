import React from "react";
import { BsRobot } from "react-icons/bs";
import { Input } from "../ui/input";

const AiAnalystBot = () => {
  return (
    <div className="bg-white rounded-[50px] p-10 py-12  relative max-w-6xl">
      <div className="text-2xl font-bold flex items-center  gap-3">
        <div className="bg-[#f4f5f6] p-4 rounded-full mB-4">
          <BsRobot />
        </div>
        <h2>Ai Analyst bot</h2>
      </div>
      <div className="my-10">
        <div className=" message-orange">
          <p className="text-sm">Where are we at with the Ion deal?</p>
        </div>
        <div className=" message-blue">
          <p className="text-sm">
            Ben has sent funds and signed docs. No further steps here. Bankless
            Ventures is officially invested in Ion!
          </p>
        </div>
      </div>
      <div>
        <Input
          placeholder="Ask me anything!"
          className=" border-none outline-none bg-gray-100 text-gray-600 py-7 rounded-3xl placeholder:font-bold"
        />
      </div>
    </div>
  );
};

export default AiAnalystBot;
