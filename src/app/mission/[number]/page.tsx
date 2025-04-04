"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import MissionForm from "@/app/components/missions/MissionForm";
import { useState } from "react";

const MissionPage = ({ params: { number: missionNum } }: any) => {
  const { data: session, status } = useSession() as any;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session) {
      setIsLoading(false);
    }
  }, [session]);

  if (isLoading) {
    if (!session) {
      return (
        <div className="grid place-items-center h-[90vh] dark:text-white text-dark pb-32">
          <p>Please log in to access this page.</p>
        </div>
      );
    }
    return (
      <div className="grid place-items-center h-full dark:text-white text-dark pb-32">
        <p>Loading...</p>
      </div>
    );
  }

  if (session.user.mission != -1 && session.user.mission < Number(missionNum)) {
    return (
      <div className="grid place-items-center h-full dark:text-white text-dark pb-48">
        You must complete the previous mission first.
      </div>
    );
  }

  return <MissionForm mission={Number(missionNum)} />;
};
export default MissionPage;
