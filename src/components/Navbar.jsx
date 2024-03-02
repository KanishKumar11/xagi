import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div className=" flex items-center justify-between w-full">
      <div className="text-[#F4D35E] text-[56px]">La</div>
      <div>
        <Image src="/nav.svg" alt="" width={32} height={32} />
      </div>
    </div>
  );
};

export default Navbar;
