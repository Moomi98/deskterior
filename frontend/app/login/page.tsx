"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  useEffect(() => {
    const kakao = (window as any).Kakao;
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-32">
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`}
      >
        <Image
          priority
          alt="kakao login"
          src="/images/kakaoLogin.png"
          width={300}
          height={100}
        />
      </Link>
    </div>
  );
}
