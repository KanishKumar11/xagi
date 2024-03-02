"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [click, setClick] = useState(0);
  return (
    <div className="h-screen overflow-clip w-full bg-[#FEDDE4] flex justify-between items-start flex-col la px-5">
      <Navbar />
      <div className="text-[80px] leading-[93.75px] text-[#0B0033] absolute top-28">
        Happy Birthday Likitha
      </div>
      <div
        className="w-[90%] h-[80%] bottom-0 left-10 z-50 bg-white absolute opacity-0"
        onClick={() => setClick(click + 1)}
      ></div>
      <div className="flex items-center absolute bottom-[200px] -rotate-12 left-10 ">
        <Image src="/flower.svg" alt="" width={45} height={45} />
        <span>click here</span>
        <Image src="/flower.svg" alt="" width={45} height={45} />
      </div>
      {click >= 1 && (
        <Image
          src="/1.png"
          className="top-[275px] left-[20px] absolute z-[1]"
          width={288}
          height={296}
          alt=""
        />
      )}
      {click >= 2 && (
        <Image
          src="/2.png"
          className="top-[470px] right-[20px] absolute z-[2]"
          width={177}
          height={177}
          alt=""
        />
      )}
      {click >= 3 && (
        <Image
          src="/3.png"
          className="top-[204px] left-[-17px] absolute z-[3]"
          width={177}
          height={177}
          alt=""
        />
      )}
      {click >= 4 && (
        <Image
          src="/4.png"
          className="top-[204px] left-[29px] absolute z-[4]"
          width={288}
          height={396}
          alt=""
        />
      )}
      {click >= 5 && (
        <>
          <Image
            src="/5.png"
            className="bottom-[200px] left-[6px] absolute z-[5]"
            width={177}
            height={177}
            alt=""
          />
          <audio autoPlay>
            <source src="/audio.mpeg" type="audio/mpeg" />
          </audio>
        </>
      )}
      {click >= 6 && (
        <Image
          src="/6.png"
          className="top-[224px] right-[20px] absolute z-[6]"
          width={177}
          height={177}
          alt=""
        />
      )}
      {click >= 7 && (
        <Image
          src="/7.png"
          className="top-[320px] left-[86px] absolute z-[7]"
          width={288}
          height={387}
          alt=""
        />
      )}
      {click >= 8 && (
        <Image
          src="/8.png"
          className="top-[203px] right-[16px] absolute z-[8]"
          width={127}
          height={127}
          alt=""
        />
      )}
      {click >= 9 && (
        <Image
          src="/9.png"
          className="bottom-[20px] left-[16px] absolute z-[9]"
          width={153}
          height={153}
          alt=""
        />
      )}
      {click >= 10 && (
        <Image
          src="/10.png"
          className="top-[200px] left-[36px] absolute z-[10]"
          width={318}
          height={419}
          alt=""
        />
      )}
      {click >= 11 && (
        <Image
          src="/11.png"
          className="bottom-[150px] right-0 absolute z-[11]"
          width={154}
          height={154}
          alt=""
        />
      )}
      {click >= 12 && (
        <Image
          src="/12.png"
          className="bottom-[150px] right-0 absolute z-[13]"
          width={178}
          height={236}
          alt=""
        />
      )}
      {click >= 13 && (
        <Image
          src="/13.png"
          className="top-[200px] left-[-13px] absolute z-[12]"
          width={154}
          height={154}
          alt=""
        />
      )}
      {click >= 14 && (
        <Image
          src="/14.png"
          className="bottom-[250px] left-[-9px] absolute z-[14]"
          width={200}
          height={200}
          alt=""
        />
      )}
      {click >= 15 && (
        <Image
          src="/15.png"
          className="top-[300px] left-[27px] absolute z-[15]"
          width={200}
          height={200}
          alt=""
        />
      )}
      {click >= 16 && (
        <Image
          src="/16.png"
          className="top-[346px] right-0 absolute z-[16]"
          width={200}
          height={200}
          alt=""
        />
      )}
      {click >= 17 && (
        <Image
          src="/17.png"
          className="bottom-[130px] right-0 absolute z-[17]"
          width={200}
          height={273}
          alt=""
        />
      )}
      {click >= 18 && (
        <Image
          src="/18.png"
          className="top-[40%] right-1/4 absolute z-[17]"
          width={211}
          height={132}
          alt=""
        />
      )}
    </div>
  );
};

export default Page;
