"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BiSolidBriefcaseAlt2 } from "react-icons/bi";
import DataTable from "./DataTable";
import { Columns } from "./Columns";
import { HiPlus } from "react-icons/hi";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import Cookies from "@/components/sections/cookies";

const DealFlow = () => {
  const [email, setEmail] = useState("");
  const getEmailCallback = useCallback(async () => {
    const userEmail = await Cookies();
    console.log(userEmail.value);
    setEmail(userEmail.value);
    console.log(email); // This won't reflect the updated state immediately
  }, [email]);
  useEffect(() => {
    getEmailCallback(); // Execute the callback on mount
  }, [getEmailCallback]);
  const [data, setData] = useState([]);
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
          .eq("email", email);

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
    <div className="relative max-w-6xl rounded-[50px] bg-white p-10 py-12">
      <div className="mb-5 flex gap-3   text-2xl font-bold">
        <div className="h-[50px]  rounded-full bg-[#f4f5f6] p-4">
          <BiSolidBriefcaseAlt2 />
        </div>
        <div className="w-full pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2>Deal Flow</h2>
              <div className="my-3 text-sm font-bold text-gray-400">
                Total Count: 1,032
              </div>
            </div>
            <Link href="/add-a-new-deal">
              <div className="cursor-pointer rounded-full bg-gray-100 p-2">
                <HiPlus />
              </div>
            </Link>
          </div>
          <div className="flex justify-between gap-10 border-b border-gray-200 py-5 text-base font-normal">
            <div className="flex items-center gap-10 font-[600]">
              <div>All Deals</div>

              <div>Under Review</div>
            </div>
            {/* <div className="flex items-center gap-10">
              <div className="cursor-pointer rounded-3xl border border-gray-300 p-5 py-1">
                Filter
              </div>
              <div className="cursor-pointer rounded-3xl border border-gray-300 p-5 py-1">
                Sort
              </div>
            </div> */}
          </div>
          <div className=" mx-auto w-full py-10 text-gray-400">
            <DataTable columns={Columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealFlow;
