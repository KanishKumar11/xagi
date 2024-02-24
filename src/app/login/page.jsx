import Link from "next/link";
import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";
import GoogleLogin from "@/components/GoogleLogin";
export default function Login({ searchParams }) {
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);

  const signIn = async (formData) => {
    "use server";
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    const email = formData.get("email");
    const password = formData.get("password");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Invalid Credentials");
    }
    cookieStore.set("email", email, { path: "/", expires });

    return redirect("/app");
  };

  const signUp = async (formData) => {
    "use server";

    // eslint-disable-next-line turbo/no-undeclared-env-vars
    const origin = process.env.URL;
    const email = formData.get("email");
    const password = formData.get("password");
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
    cookieStore.set("email", email, { path: "/" });

    return redirect("/app");
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 text-slate-100 sm:max-w-md">
      <Link
        href="/"
        className="bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm text-slate-300 no-underline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </Link>

      <form
        className="flex w-full flex-1 flex-col justify-center gap-4  animate-in"
        action={signIn}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-slate-100">
            Email
          </Label>
          <Input name="email" placeholder="you@example.com" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-slate-100">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
        {searchParams?.message && (
          <Alert variant="destructive" className="bg-white p-3 ">
            {searchParams.message}
          </Alert>
        )}
        <div className="flex flex-col gap-2">
          <Button formAction={signIn} variant="secondary">
            Sign In
          </Button>
          <Button formAction={signUp} variant="secondary">
            Sign Up
          </Button>
        </div>
      </form>
      <GoogleLogin />
    </div>
  );
}
