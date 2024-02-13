import React from "react";
import Details from "../sections/Details";
import RecentUpdates from "../sections/RecentUpdates";
import DealFlow from "../sections/DealFlow/DealFlow";
import AiAnalystBot from "../sections/AiAnalystBot";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-12 w-full gap-20 p-10">
      <div className=" col-span-8 gap-10 flex-col flex">
        <Details />
        <DealFlow />
      </div>
      <div className=" col-span-4 flex gap-10 flex-col">
        <RecentUpdates />
        <AiAnalystBot />
      </div>
    </div>
  );
};

export default Dashboard;
