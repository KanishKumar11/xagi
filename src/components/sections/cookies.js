"use server";
import { cookies } from "next/headers";

const Cookies = () => {
  const cookieStore = cookies();

  const emailCookieValue = cookieStore.get("email");
  console.log("Email cookie value:", emailCookieValue?.value);

  return emailCookieValue;
};

export default Cookies;
