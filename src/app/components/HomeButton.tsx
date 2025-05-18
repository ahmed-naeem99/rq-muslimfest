"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const HomeButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession() as any;

  const handleNavigation = () => {
    if (status != "authenticated") {
      router.push("/login");
      return;
    }

    router.push("/mission/1");
  };

  return (
    <div
      className="btn text-white rounded-2xl dark:bg-neutral-800 dark:hover:bg-neutral-700 bg-sky-600 hover:bg-sky-500 border-none  text-2xl"
      onClick={handleNavigation}
    >
      <div className="font-bold">ENTER</div>
    </div>
  );
};

export default HomeButton;
