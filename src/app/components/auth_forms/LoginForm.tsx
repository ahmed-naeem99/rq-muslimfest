"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import realityQuestLogo from "../../../../public/rqlogo.svg";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
    general: "",
  });

  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessages({
      username: "",
      password: "",
      general: "",
    });
    const isUsernameValid = validateUsername(username);

    if (isUsernameValid) {
      const response = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (!response?.error) {
        router.push("/");
        router.refresh();
      } else {
        switch (response.error) {
          case "InvalidUsername":
            setErrorMessages((prev) => ({
              ...prev,
              username:
                "Invalid username format. Username must be 3-36 characters long and contain only letters, numbers, and underscores.",
            }));
            break;
          case "IncorrectPassword":
            setErrorMessages((prev) => ({
              ...prev,
              password: "Incorrect password. Please try again.",
            }));
            break;
          case "UserNotFound":
            setErrorMessages((prev) => ({
              ...prev,
              username: "Username not found.",
            }));
            break;
          default:
            setErrorMessages((prev) => ({
              ...prev,
              general: "An unknown error occurred.",
            }));
            break;
        }
      }
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        username:
          "Invalid username format. Username must be 3-36 characters long and contain only letters, numbers, and underscores.",
      }));
    }
  };

  const validateUsername = (username: string) => {
    // Regular expression for username validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;
    return usernameRegex.test(username);
  };

  return (
    <div className="grid place-items-center mt-16">
      <div className="flex flex-1 flex-col items-center pb-16 lg:px-8 w-full">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Image priority src={realityQuestLogo} alt="Logo" width={300} />
          <h2 className="mt-6 px-6 text-center text-2xl font-bold leading-9 tracking-tight text-sky-950 dark:text-white">
            Sign in to your Team Account
          </h2>
        </div>

        <div className="mt-10 max-[400px]:w-[80%] w-[70%] md:w-[50%] lg:max-w-[450px] dark:bg-zinc-600/20 p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6  text-dark dark:text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                />
                {errorMessages.username && (
                  <p className="text-red-500 pt-3 w-full max-w-xs">
                    {errorMessages.username}
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
                  <button
                    className="cursor-pointer font-semibold text-sky-600 hover:text-sky-500 px-2"
                    onClick={() => router.push("forgot-password")}
                  >
                    Forgot password?
                  </button>
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
                {errorMessages.password && (
                  <p className="text-red-500 pt-3 w-full max-w-xs">
                    {errorMessages.password}
                  </p>
                )}
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
              {errorMessages.general && (
                <p className="text-red-500 pt-3 w-full max-w-xs">
                  {errorMessages.general}
                </p>
              )}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
