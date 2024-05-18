"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

const Mission1Page = () => {
  const { data: session, update } = useSession() as any;

  const [submission, setSubmission] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isGreen, setIsGreen] = useState(true);

  const handleM1Submit = async () => {
    if (submission === "Test" && session.user.mission === 1) {
      const response = await fetch("/api/auth/updateMission", {
        method: "POST",
        body: JSON.stringify({
          username: session.user.username,
          setMission: 2,
        }),
      });

      if (response.status === 200) {
        setIsGreen(true);
        setSubmitMessage("Correct! Well done, proceed to mission 2.");
        update({ mission: 2 });
        console.log(session);
      } else {
        setIsGreen(false);
        setSubmitMessage("An error has occurred. Please try again.");
      }
    } else if (!(session.user.mission === 1)) {
      setIsGreen(false);
      setSubmitMessage("You have already completed this mission.");
    } else {
      setIsGreen(false);
      setSubmitMessage("Incorrect.");
    }
  };

  return (
    <div className="h-full justify-center pb-16 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center ">
      <input
        id="missionAnswer"
        name="missionAnswer"
        type="text"
        autoComplete="Enter Answer"
        onChange={(e) => setSubmission(e.target.value)}
        required
        className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
      />
      {submitMessage && isGreen && (
        <p className="text-green-500 pt-3 w-full">{submitMessage}</p>
      )}
      {submitMessage && !isGreen && (
        <p className="text-red-500 pt-3 w-full">{submitMessage}</p>
      )}

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
