import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ForgotPassForm from "../components/auth_forms/ForgotPassForm";

const ForgotPassPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <ForgotPassForm />;
};

export default ForgotPassPage;
