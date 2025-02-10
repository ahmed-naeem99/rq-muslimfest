"use client";

import React from "react";
import { useSession } from "next-auth/react";
import MissionForm from "@/app/components/missions/MissionForm";

const MissionPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <MissionForm curr_mission={session.user.mission} user_data={session.user} />
  );
};

export default MissionPage;
