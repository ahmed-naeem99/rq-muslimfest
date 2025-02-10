"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import realityQuestLogo from "../../../../public/rqlogo.svg";

export default function ForgotPassForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const validateEmail = (email: string) => {
    // Regular expression for username validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    const button = document.querySelector("button");
    button?.setAttribute("disabled", "true");
    if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      button?.removeAttribute("disabled");
    } else {
      setEmailError("");

      const response = await fetch("/api/forgotPassword", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        // Disable forgot password button from being clicked multiple times
        setResetSent(true);
      } else {
        setEmailError("An error has occurred. Please try again.");
        button?.removeAttribute("disabled");
      }
    }
  };

  return (
    <div className="grid place-items-center">
      <div className="flex flex-1 flex-col justify-center pb-32 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <Image priority src={realityQuestLogo} alt="Logo" width={300} />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-sky-950 dark:text-white">
            Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full px-3 rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                />
                {emailError && !resetSent && (
                  <p className="text-red-500 pt-3 w-full max-w-xs">
                    {emailError}
                  </p>
                )}
                {!emailError && resetSent && (
                  <p className="text-green-500 pt-3 w-full max-w-xs">
                    A reset password link has been sent to your email.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={!email}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
