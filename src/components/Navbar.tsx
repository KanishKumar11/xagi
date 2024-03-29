import React from "react";
import Image from "next/image";
import AuthenticatedNavigation from "@/components/AuthenticatedNavigation";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="mx-auto flex max-w-[1000px] items-center justify-between px-5 py-10 text-slate-200">
      <Link href="/">
        <div className="ml-[100px]  cursor-pointer lg:ml-0">
          <Image
            src="/logo.png"
            alt=""
            width={400}
            height={200}
            className="h-[40px] w-auto"
          />
        </div>
      </Link>
      <AuthenticatedNavigation />
    </div>
  );
};

export default Navbar;
