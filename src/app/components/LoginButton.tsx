"use client"; //client component so it can listen for browser events
import React from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";

const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

const LoginButton = () => {
  const router = useRouter();

  return (
    <div
      className="btn bg-sky-800 text-white border-none hover:bg-sky-700 text-2xl  font-light"
      onClick={() => router.push("/login")}
    >
      <div className={poseyFont.className}>ENTER</div>
    </div>
  );
};

export default LoginButton;
