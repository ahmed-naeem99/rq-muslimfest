import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LoginForm from "../components/auth_forms/LoginForm";

const LoginPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
};

export default LoginPage;
