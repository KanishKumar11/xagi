import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

const GoogleLogin = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const signInWithGoogle = async () => {
    "use server";
    try {
      const { user, error } = await supabase.auth.signIn({
        provider: "google",
      });

      if (error) {
        throw error; // Throw an error to be caught in the catch block
      }

      console.log(user);
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  // const user = supabase.auth.user();

  // console.log(user);

  return (
    <div>
      <Button onClick={signInWithGoogle}>Google</Button>
    </div>
  );
};

export default GoogleLogin;
