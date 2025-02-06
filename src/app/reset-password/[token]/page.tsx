import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ResetPassForm from "../../components/ResetPassForm";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const ResetPassPage = async ({ params }: any) => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  const token = params.token;

  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/verifyToken`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (response.status != 200) {
    return (
      <div className="flex flex-col text-center mt-11 dark:text-white items-center">
        <h1 className="text-3xl mb-6 font-bold">Invalid or Expired Token</h1>
        <p>Please request a new password reset link.</p>
      </div>
    );
  }

  const data = await response.json();

  return <ResetPassForm data={data.result} />;
};

export default ResetPassPage;
