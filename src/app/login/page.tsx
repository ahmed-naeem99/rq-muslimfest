"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import realityQuestLogo from "../../../public/rqlogo.svg";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsUserValid] = useState(true);
  const router = useRouter();

  const handleLogin = () => {
    const isUsernameValid = validateUsername(username);

    setIsUserValid(isUsernameValid);

    if (isUsernameValid) {
      // Proceed with sign-in logic
      console.log("Signing in...");
    }
  };

  const validateUsername = (username: string) => {
    // Regular expression for username validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;
    return usernameRegex.test(username);
  };

  return (
    <div className="grid place-items-center ">
      <div className="flex flex-1 flex-col justify-center pb-16 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Image priority src={realityQuestLogo} alt="Logo" width={300} />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-sky-950 dark:text-white">
            Sign in to your Team Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6  text-dark dark:text-white"
              >
                Team Name
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text" // Changed to text type for username input
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={`block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 ${
                    !isValid && "border-red-500"
                  }`}
                />
                {!isValid && (
                  <p className="text-red-500 pt-3 w-full max-w-xs">
                    Invalid username format. Username must be 3-36 characters
                    long and contain only letters, numbers, and underscores.
                  </p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6  text-dark dark:text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <div
                    onClick={() => router.push("/forgot-password")}
                    className="cursor-pointer font-semibold text-sky-600 hover:text-sky-500"
                  >
                    Forgot password?
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={handleLogin}
                disabled={!username || !password}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            Haven&apos;t made a team account?{" "}
            <button
              onClick={() => router.push("register")}
              className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
