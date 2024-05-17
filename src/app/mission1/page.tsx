"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Mission1Page = () => {
  const session = useSession() as any;

  const router = useRouter();
  const [submission, setSubmission] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const handleM1Submit = async () => {
    if (submission === "Test") {
      console.log("Correct!, performing actions...");
      console.log(session);
      const response = await fetch("/api/auth/updateMission1", {
        method: "POST",
        body: JSON.stringify({
          username: session.data.user.username,
          setMission: 2,
        }),
      });

      console.log(response);

      if (response.status === 200) {
        router.push("/mission2");
        router.refresh();
      } else {
        console.log("Failed to update mission.");
      }
    } else {
      console.log("Invalid input. Please enter the correct word.");
      setIsCorrect(false);
    }
  };

  return (
    <div className="h-full justify-center pb-16 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center ">
      <input
        id="mission1answer"
        name="mission1answer"
        type="text" // Changed to text type for username input
        autoComplete="Enter Answer"
        onChange={(e) => setSubmission(e.target.value)}
        required
        className={`block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 ${
          !isCorrect && "border-red-500"
        } `}
      />
      {!isCorrect && <p className="text-red-500 pt-3 w-full">Incorrect.</p>}

      <div className=" w-full py-4">
        <button
          onClick={handleM1Submit}
          disabled={!submission}
          className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Mission1Page;
