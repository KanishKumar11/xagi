// pages/_middleware.js
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!
);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const data = await supabase.auth.getUser(
    request.cookies.get("access_token")?.value
  );
  console.log("user");
  console.log(data);
  const isPublicPath = path === "/login" || path === "/";

  const token = request.cookies.get("access_token")?.value || "";
  // Allow access to logged-in users for /, /app, and /add-a-new-deal
  if (data && ["/", "/app", "/add-a-new-deal"].includes(path)) {
    return;
  }

  // If the user is not logged in and trying to access a protected route, redirect to login
  if (!data.data && !["/login"].includes(path)) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If the user is logged in and trying to access a public route, redirect to home

  // Allow access to everyone for public routes (/ and /login)
  if (["/login"].includes(path)) {
    return;
  }

  // For any other case, redirect to login
  return NextResponse.redirect(new URL("/login", request.nextUrl));
}

export const config = {
  matcher: ["/", "/app", "/login", "/add-a-new-deal"],
};
