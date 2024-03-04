"use client";

import { BasejumpUserSession, SignedIn, SignedOut } from "@usebasejump/next";
import Link from "next/link";

export default function AuthenticatedNavigation() {
  return (
    <BasejumpUserSession>
      <SignedIn>
        <Link href="/app" className="font-semiboldd text-2xl">
          Dashboard
        </Link>
      </SignedIn>
      <SignedOut>
        <Link href="/login" className="text-2xl font-semibold">
          Login
        </Link>
      </SignedOut>
    </BasejumpUserSession>
  );
}
