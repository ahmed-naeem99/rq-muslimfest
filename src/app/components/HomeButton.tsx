"use client";
import React from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import { useSession } from "next-auth/react";

const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

const HomeButton = () => {
  const router = useRouter();
  const session = useSession() as any;

  const handleNavigation = () => {
    if (session.status === "authenticated") {
      if (!(session.data.user.mission === -1)) {
        router.push("/mission/" + session.data.user.mission);
      } else {
        router.push("/leaderboard");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      className="btn bg-sky-800 text-white border-none hover:bg-sky-700 text-2xl  font-light"
      onClick={handleNavigation}
    >
      <div className={poseyFont.className}>ENTER</div>
    </div>
  );
};

export default HomeButton;
