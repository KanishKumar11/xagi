"use server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// Assume this function is within a component or a page
const Cookies = () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Example: Get the value of a specific cookie
  const emailCookieValue = cookieStore.get("email");
  console.log("Email cookie value:", emailCookieValue.value);

  // Example: Use the Supabase client to check authentication status
  const session = supabase.auth.getSession();
  if (session) {
    console.log("User is authenticated:", session.user);
  } else {
    console.log("User is not authenticated");
  }
  return emailCookieValue;
};

// Call the function
// Cookies();
export default Cookies;
