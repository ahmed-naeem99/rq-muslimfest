"use client";

import React from "react";
import { useSession } from "next-auth/react";
import MissionForm from "@/app/components/missions/MissionForm";

const MissionPage = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="grid place-items-center h-full dark:text-white text-dark">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <MissionForm curr_mission={session.user.mission} user_data={session.user} />
  );
};

export default MissionPage;
