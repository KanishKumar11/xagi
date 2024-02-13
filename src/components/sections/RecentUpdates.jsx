import Link from "next/link";
import React from "react";
import { MdOutlineUpdate } from "react-icons/md";
const UpdateItem = [
  {
    title: "New deal was added by ai-bot",
    description: "Yugo was added to the deal base",
    link: "#",
    time: "3 mins ago",
  },
  {
    title: "New deal was added by Brent",
    description: "Ion Protocol was added to the deal base",
    link: "#",
    time: "5 mins ago",
  },
  {
    title: "Deal updated by Kim",
    description: "Protals.fi was recently updated",
    link: "#",
    time: "1 hr ago",
  },
];
const RecentUpdates = () => {
  return (
    <div className="bg-white rounded-[50px] p-10 py-12 relative max-w-5xl">
      <div className="text-2xl font-bold flex items-center  gap-3 mb-5">
        <div className="bg-[#f4f5f6] p-4 rounded-full mB-4">
          <MdOutlineUpdate />
        </div>
        <h2>Recent Updates</h2>
      </div>
      <div className="flex flex-col gap-10">
        {UpdateItem.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <div className="font-[600]">
              <div className="text-black text-xl">{item.title}✨</div>
              <div className="text-gray-400 text-lg">{item.description}</div>
            </div>
            <div className="text-sm">
              <div className="font-bold p-1 px-5 bg-gray-200/50 text-gray-400">
                <Link href={item.link}>view</Link>
              </div>
              <div className="text-gray-400">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUpdates;
