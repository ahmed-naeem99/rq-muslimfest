"use client";

import React from "react";
import { useSession } from "next-auth/react";
import MissionForm from "@/app/components/missions/MissionForm";

const MissionPage = ({ params: { number } }: any) => {
  const { data: session, status } = useSession() as any;
  if (status === "loading") {
    return (
      <div className="grid place-items-center h-full dark:text-white text-dark">
        <p>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="grid place-items-center h-full dark:text-white text-dark">
        Please log in to access this page.
      </div>
    );
  }

  return <MissionForm mission={number} />;
};

export default MissionPage;
