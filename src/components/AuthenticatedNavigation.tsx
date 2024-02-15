"use client";

import { BasejumpUserSession, SignedIn, SignedOut } from "@usebasejump/next";
import Link from "next/link";

export default function AuthenticatedNavigation() {
  return (
    <BasejumpUserSession>
      <SignedIn>
        <Link href="/app">Dashboard</Link>
      </SignedIn>
      <SignedOut>
        <Link href="/login">Login</Link>
      </SignedOut>
    </BasejumpUserSession>
  );
}
