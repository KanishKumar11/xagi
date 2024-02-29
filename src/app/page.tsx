"use client";
import Home from "@/components/pages/Home";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const accessToken = new URLSearchParams(window?.location?.hash).get(
    "#access_token"
  );
  const refreshToken = new URLSearchParams(window?.location?.hash).get(
    "refresh_token"
  );
  console.log(accessToken);
  console.log(refreshToken);

  useEffect(() => {
    const cookies = async () => {
      if (accessToken) {
        try {
          const response = await fetch("/api/google", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken,
              refreshToken,
            }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();

          if (responseData.success) {
            console.log("success");
          } else {
            console.log("error");
          }
          router.push("/app");
        } catch (error: any) {
          console.error("Error:", error?.message);
        }
      }
    };

    cookies();
  }, [accessToken, refreshToken, router]);

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <Home />
    </div>
  );
}
