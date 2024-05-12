"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import realityQuestLogo from "../../../public/rqlogo.svg";

const ForgotPassPage = () => {
  const [email, setEmail] = useState(" ");
  const router = useRouter();

  return (
    <div className="grid place-items-center h-full">
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
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => null}
                disabled={!email}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Send Forgot Password Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassPage;
