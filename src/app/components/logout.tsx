"use client";
import { useRouter } from "next/navigation";

import { signOut } from "next-auth/react";

export default function Logout() {
  const router = useRouter();

  return (
    <span
      onClick={() => {
        signOut({ callbackUrl: "/login", redirect: true });
      }}
    >
      Logout
    </span>
  );
}
