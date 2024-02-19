import Image from "next/image";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Home = () => {
  return (
    <div className="mx-auto max-w-[1000px] py-2 pb-20">
      <div className="">
        <h1 className="p-10 text-center text-[50px] font-[600] leading-[50px] text-slate-200 md:px-28">
          A powerful ai analyst tool for your VC firm
        </h1>
        <p className="text-wrap p-5 text-center text-base text-slate-200">
          Automatically organize and conduct research for your deal flow
          <span className="block font-bold">Built by VCs, for VCs.</span>
        </p>
        <div className="my-10 flex  items-center justify-center gap-10 font-bold">
          <Button className="bg-cyan-800 p-5 py-6 hover:bg-cyan-900">
            Join Waitlist ✨
          </Button>
          <Button className="bg-slate-300 p-5 py-6 text-[#002E58] hover:bg-slate-400">
            Drop Us a follow
          </Button>
        </div>
        <Image src="/sc.webp" alt="" width={961} height={671} />
        <div className=" flex w-full items-center">
          <div className="my-20 w-1/2 px-5 text-xl font-bold text-slate-200 lg:text-[50px] lg:leading-snug">
            We&#39;re experimenting rn. Join the waitlist to be the first to try
          </div>
          <div className="relative flex w-[40%]">
            <Input
              placeholder="eg. name@example.com"
              className="w-full rounded-3xl border-none bg-slate-400/50 p-5 py-2 text-slate-50 outline-none placeholder:text-xs placeholder:text-slate-50/70  md:py-7"
            />
            <div className="absolute right-2 top-16 -translate-y-1/2 lg:top-1/2">
              <Button className="rounded-2xl  text-xs  md:text-xl">Join</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
