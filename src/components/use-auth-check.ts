import { useRouter } from "next/router";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const useAuthCheck = (redirectedFrom?: string) => {
  const { replace } = useRouter();
  const { session } = useSessionContext();

  useEffect(() => {
    if (session && redirectedFrom) {
      replace(redirectedFrom as string);
    }
  }, [session, redirectedFrom, replace]);
};

export default useAuthCheck;
