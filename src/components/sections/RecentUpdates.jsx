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
          .order("createdAt", { ascending: false });
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
    <div className="relative w-full max-w-5xl rounded-[50px] bg-white p-10 py-12">
      <div className="mb-5 flex items-center gap-3  text-2xl font-bold">
        <div className="mB-4 rounded-full bg-[#f4f5f6] p-4">
          <MdOutlineUpdate />
        </div>
        <h2>Recent Updates</h2>
      </div>
      <div className="flex w-full flex-col gap-10">
        {data.slice(0, 4).map((item, index) => (
          <div className="flex w-[70%] justify-between md:w-full" key={index}>
            <div className="max-w-[80%] text-base font-[600] md:max-w-full md:text-xl">
              <div className=" text-black">
                New deal was added by {item.email}✨
              </div>
              <div className="my-2  font-bold text-black">{item.name}</div>
              <div className="text-lg font-normal text-gray-400">
                {item.tldr.length > MAX_WORDS &&
                !expandedItems.includes(index) ? (
                  <>
                    {`${item.tldr
                      .split(" ")
                      .slice(0, MAX_WORDS)
                      .join(" ")}... `}
                    <button
                      onClick={() =>
                        setExpandedItems((prevItems) => [...prevItems, index])
                      }
                      className="text-blue-500"
                    >
                      Read More
                    </button>
                  </>
                ) : (
                  <>
                    {item.tldr}
                    {item.tldr.length > MAX_WORDS && (
                      <button
                        onClick={() =>
                          setExpandedItems((prevItems) =>
                            prevItems.filter((item) => item !== index)
                          )
                        }
                        className="text-blue-500"
                      >
                        Read Less
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="text-sm">
              <div className="min-w-[40%] bg-gray-200/50 p-1 px-5 font-bold text-gray-400">
                <Link href={item.website}>view</Link>
              </div>
              <div className="text-xs text-gray-400">{item.deal_date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUpdates;
