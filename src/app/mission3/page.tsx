"use client";

import React, { use, useState } from "react";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";

const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

const Mission3Page = () => {
  const { data: session, update } = useSession() as any;

  const [submission, setSubmission] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isGreen, setIsGreen] = useState(true);

  const [canUseHint1, setCanUseHint1] = useState(false);
  const [canUseHint2, setCanUseHint2] = useState(false);

  const [usedHint1, setUsedHint1] = useState(false);
  const [usedHint2, setUsedHint2] = useState(false);

  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);

  const handleM3Hint1 = async () => {
    if (session.user.hints3used == 0) {
      const response = await fetch("/api/auth/updateHints", {
        method: "POST",
        body: JSON.stringify({
          username: session.user.username,
          currMiss: 3,
        }),
      });

      console.log(response);

      if (response.status === 200) {
        console.log("success");
        setShowHint1(true);
        setUsedHint1(true);
        setCanUseHint1(false);
        update({ hints3used: 1 });
      }
    }
  };
  const handleM3Hint2 = async () => {
    if (session.user.hints3used == 1) {
      const response = await fetch("/api/auth/updateHints", {
        method: "POST",
        body: JSON.stringify({
          username: session.user.username,
          currMiss: 3,
        }),
      });
      if (response.status === 200) {
        console.log("success");
        setShowHint2(true);
        setUsedHint2(true);
        setCanUseHint2(false);
        update({ hints3used: 2 });
      }
    }
  };

  const handleM3Submit = async () => {
    if (submission === "Mark Sykes" && session.user.mission === 3) {
      const response = await fetch("/api/auth/updateMission", {
        method: "POST",
        body: JSON.stringify({
          username: session.user.username,
          setMission: -1,
        }),
      });

      if (response.status === 200) {
        setIsGreen(true);
        setSubmitMessage(
          "Correct! Well done, you have completed the quest and your finish time has been logged."
        );
        setCanUseHint1(false);
        setCanUseHint2(false);
        update({ mission: -1 });
        console.log(session);
      } else {
        setIsGreen(false);
        setSubmitMessage("An error has occurred. Please try again.");
      }
    } else if (!(session.user.mission === 3)) {
      setIsGreen(false);
      setCanUseHint1(false);
      setCanUseHint2(false);
      if (session.user.mission === 1 || session.user.mission === 2) {
        setSubmitMessage("You have not yet reached this mission.");
      } else {
        setSubmitMessage("You have already completed this mission.");
      }
    } else {
      setIsGreen(false);
      setSubmitMessage("Incorrect.");
      if (session.user.hints3used == 0) {
        setCanUseHint1(true);
      } else if (session.user.hints3used == 1) {
        setCanUseHint2(true);
      }
    }
  };

  return (
    <div className="h-full justify-center pb-16 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center ">
      <div className="flex flex-col items-center text-center w-full overflow-auto ">
        <iframe
          className="w-full"
          height="250"
          src="https://www.youtube.com/embed/Z43NS_BL0eE?si=1V0LdR3175AEbhha"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Mission 2 Video"
        ></iframe>

        <div
          className={`dark:text-white text-black text-2xl py-8 ${poseyFont.className}`}
        >
          Mission 3 Submission
        </div>
        <input
          id="missionAnswer"
          name="missionAnswer"
          type="text" // Changed to text type for username input
          autoComplete="Enter Answer"
          onChange={(e) => setSubmission(e.target.value)}
          required
          className="block px-3 sm:w-full w-3/4 rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
        />
        {submitMessage && isGreen && (
          <p className="text-green-500 pt-3 sm:w-full w-3/4">{submitMessage}</p>
        )}
        {submitMessage && !isGreen && (
          <p className="text-red-500 pt-3 sm:w-full w-3/4">{submitMessage}</p>
        )}

        <div className=" flex flex-col text-center items-center gap-y-5 sm:w-full w-3/4 py-4">
          <button
            onClick={handleM3Submit}
            disabled={!submission}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Submit
          </button>
          <button
            onClick={handleM3Hint1}
            disabled={!canUseHint1}
            className="disabled:opacity-40 flex w-3/4 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Use Hint 1 (Time Penalty)
          </button>
          {showHint1 && (
            <p className="text-white  w-full">
              Since this is the last mission don&apos;t expect the hints to be
              too helpful &comma;. There are 2 different audio tricks done on
              the video Re- and...
            </p>
          )}
          <button
            onClick={handleM3Hint2}
            disabled={!canUseHint2}
            className="disabled:opacity-40 flex w-3/4 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Use Hint 2 (Time Penalty)
          </button>
          {showHint2 && (
            <p className="text-white  w-full">
              Retrace your steps means go back to where you went before in the
              convention center. Look in places you didn:&apos;t look in before.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mission3Page;
