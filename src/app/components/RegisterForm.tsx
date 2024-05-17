"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import realityQuestLogo from "../../../public/rqlogo.svg";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isUserValid, setIsUserValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    username: "",
    password: "",
  });

  const router = useRouter();

  const validateUsername = (username: string) => {
    // Regular expression for username validation
    const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;
    return usernameRegex.test(username);
  };

  const validatePasswords = (password: string, rePassword: string) => {
    return password === rePassword;
  };

  const validateEmail = (email: string) => {
    // Regular expression for username validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleServerErrors = (result: any) => {
    switch (result.code) {
      case "EMAIL_EXISTS":
        setErrorMessages((prev) => ({
          ...prev,
          email: "Email already exists.",
        }));
        break;
      case "USERNAME_EXISTS":
        setErrorMessages((prev) => ({
          ...prev,
          username: "Username already exists.",
        }));
        break;
      default:
        setErrorMessages((prev) => ({
          ...prev,
          general: "An unknown error occurred.",
        }));
        break;
    }
  };

  const handleClientErrors = (
    isEmailValid: boolean,
    isUsernameValid: boolean,
    isPasswordValid: boolean
  ) => {
    if (!isEmailValid) {
      setErrorMessages((prev) => ({ ...prev, email: "Invalid email format." }));
    } else {
      setErrorMessages((prev) => ({ ...prev, email: "" }));
    }
    if (!isUsernameValid) {
      setErrorMessages((prev) => ({
        ...prev,
        username:
          "Invalid username format. Username must be 3-36 characters long and contain only letters, numbers, and underscores.",
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, username: "" }));
    }
    if (!isPasswordValid) {
      setErrorMessages((prev) => ({
        ...prev,
        password: "Passwords do not match.",
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSignUp = async () => {
    const isEmailValid = validateEmail(email);
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePasswords(password, rePassword);

    setIsEmailValid(isEmailValid);
    setIsUserValid(isUsernameValid);
    setIsPasswordValid(isPasswordValid);

    if (isEmailValid && isUsernameValid && isPasswordValid) {
      setErrorMessages({
        email: "",
        username: "",
        password: "",
      });
      // Proceed with sign-up logic
      console.log("Signing up...");
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });
      console.log({ response });
      const result = await response.json();
      if (response.status === 200) {
        router.push("/login");
        router.refresh();
      } else {
        handleServerErrors(result);
      }
    } else {
      handleClientErrors(isEmailValid, isUsernameValid, isPasswordValid);
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="flex flex-1 flex-col justify-center pb-16 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Image priority src={realityQuestLogo} alt="Logo" width={300} />
          <h2 className="px-2 mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-dark dark:text-white">
            Create a New Team Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full max-w-xs flex flex-col">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6  text-dark dark:text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                  className={`block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 ${
                    !isEmailValid && "border-red-500"
                  }`}
                />
                {errorMessages.email && (
                  <p className="text-red-500 pt-3 w-full max-w-xs">
                    {errorMessages.email}
                  </p>
                )}
              </div>
            </div>

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
                  type="text"
                  autoComplete="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required
                  className={`block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 ${
                    !isUserValid && "border-red-500"
                  }`}
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 ${
                    !isUserValid && "border-red-500"
                  }`}
                />
                {errorMessages.password && (
                  <p className="text-red-500 pt-3 w-full max-w-xs">
                    {errorMessages.password}
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
                onClick={handleSignUp}
                disabled={!email || !password || !username || !rePassword}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
