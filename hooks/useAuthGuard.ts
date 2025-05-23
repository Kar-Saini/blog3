"use client";
import getUserDetailsByCivicAddress from "@/app/actions/getUserDetailsByCivicAddress";
import { useUser } from "@civic/auth-web3/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default async function useAuthGuard() {
  const router = useRouter();
  const userContext = useUser();
  console.log(userContext);
  useEffect(() => {
    if (userContext.authStatus !== "authenticated") {
      toast.error("Please login");
      const timeout = setTimeout(() => {
        router.push("/");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [userContext.authStatus]);
  if (localStorage.getItem("userId")) {
    return localStorage.getItem("userId");
  } else {
    const user = await getUserDetailsByCivicAddress(
      userContext?.user?.solana?.address
    );
    user && localStorage.setItem("userId", user.id);
    return user.id;
  }
}
