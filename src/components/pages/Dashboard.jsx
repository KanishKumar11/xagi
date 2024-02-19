import React from "react";
import Details from "../sections/Details";
import RecentUpdates from "../sections/RecentUpdates";
import DealFlow from "../sections/DealFlow/DealFlow";
import AiAnalystBot from "../sections/AiAnalystBot";

const Dashboard = () => {
  return (
    <div className="flex  w-[100vw] grid-cols-12 flex-col gap-20 p-2 lg:grid lg:p-10">
      <div className="col-span-12 flex flex-col gap-10 xl:col-span-8">
        <Details />
        <DealFlow />
      </div>
      <div className="col-span-12 flex flex-col gap-10 xl:col-span-4">
        <RecentUpdates />
        <AiAnalystBot />
      </div>
    </div>
  );
};

export default Dashboard;
