"use client";
import { createClient } from "@supabase/supabase-js";
import { Button } from "./ui/button";

const GoogleLogin = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const signInWithGoogle = async () => {
    try {
      console.log("trying");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // eslint-disable-next-line turbo/no-undeclared-env-vars
          redirectTo: `${process.env.URL}/auth/callback`,
        },
      });
      console.log("done");

      console.log(data);
      if (error) {
        throw error; // Throw an error to be caught in the catch block
      }
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div>
      <span className="mb-3 flex w-full items-center justify-center text-center">
        or
      </span>
      <Button
        onClick={signInWithGoogle}
        className="login-with-google-btn w-full"
      >
        LogIn with Google
      </Button>
    </div>
  );
};

export default GoogleLogin;
