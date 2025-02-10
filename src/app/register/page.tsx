import React from "react";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import RegisterForm from "../components/auth_forms/RegisterForm";

const RegisterPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <RegisterForm />;
};

export default RegisterPage;
