"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import realityQuestLogo from "../../../public/rqlogo.svg";
import { useRouter } from "next/navigation";

export default function ResetPassForm(data: any) {
  const [userData, setUserData] = useState(data);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleReset = async () => {
    if (password !== rePassword) {
      setIsPasswordValid(false);
      setError("Passwords do not match.");
    } else {
      const response = await fetch("/api/resetPassword", {
        method: "POST",
        body: JSON.stringify({ password }),
      });

      if (response.status === 200) {
        router.push("/login");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="flex flex-1 flex-col justify-center pb-32 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Image priority src={realityQuestLogo} alt="Logo" width={300} />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-sky-950 dark:text-white">
            Reset Password
          </h2>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6  text-dark dark:text-white"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
            />
            {error && (
              <p className="text-red-500 pt-3 w-full max-w-xs">{error}</p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6  text-dark dark:text-white"
            >
              Re-enter Password
            </label>
          </div>
          <div className="mt-2 pb-6">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="password"
              onChange={(e) => setRePassword(e.target.value)}
              required
              className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleReset}
            disabled={!password || !rePassword}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
