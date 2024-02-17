"use client";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState([]);
  const [expandedItems, setExpandedItems] = useState([]);
  const MAX_WORDS = 20;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  // console.log(userEmail);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: deals, error } = await supabase
          .from("details")
          .select("*")
          .order({ createdAt: "desc" });
        if (error) {
          console.error("Error fetching data from Supabase:", error.message);
        } else {
          setData(deals || []);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  });
  return (
    <div className="relative max-w-5xl rounded-[50px] bg-white p-10 py-12">
      <div className="mb-5 flex items-center gap-3  text-2xl font-bold">
        <div className="mB-4 rounded-full bg-[#f4f5f6] p-4">
          <MdOutlineUpdate />
        </div>
        <h2>Recent Updates</h2>
      </div>
      <div className="flex flex-col gap-10">
        {data.map((item, index) => (
          <div className="flex justify-between" key={index}>
            <div className="font-[600]">
              <div className="text-xl text-black">
                New deal was added by {item.email}✨
              </div>
              <div className="text-lg text-gray-400">
                {truncateText(item.tldr, MAX_WORDS)}
                {item.tldr.split(" ").length > MAX_WORDS && (
                  <span
                    className="cursor-pointer text-blue-500"
                    onClick={() => toggleExpansion(index)}
                  >
                    {expandedItems.includes(index)
                      ? " Read less"
                      : " Read more"}
                  </span>
                )}
              </div>
            </div>
            <div className="text-sm">
              <div className="bg-gray-200/50 p-1 px-5 font-bold text-gray-400">
                <Link href={item.website}>view</Link>
              </div>
              <div className="text-gray-400">{item.createdAt}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUpdates;
