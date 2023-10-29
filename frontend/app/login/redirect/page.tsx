"use client";

import { useEffect } from "react";
import { login } from "@/src/apis/login";
import { useRouter } from "next/navigation";
import Loading from "@/src/components/common/Loading";

interface IRedirect {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}
export default function Redirect(params: IRedirect) {
  const router = useRouter();

  const getToken = async () => {
    const result = await login(params.searchParams.code);
    localStorage.setItem("token", result.token);
    router.push("/");
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Loading text="로그인 중..." />
    </div>
  );
}
