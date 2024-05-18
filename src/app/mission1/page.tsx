"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";

const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

const Mission1Page = () => {
  const { data: session, update } = useSession() as any;

  const [submission, setSubmission] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isGreen, setIsGreen] = useState(true);

  const [canUseHint1, setCanUseHint1] = useState(false);
  const [canUseHint2, setCanUseHint2] = useState(false);
  const [canUseHint3, setCanUseHint3] = useState(false);

  const [usedHint1, setUsedHint1] = useState(false);
  const [usedHint2, setUsedHint2] = useState(false);
  const [usedHint3, setUsedHint3] = useState(false);

  const [showHint1, setShowHint1] = useState(false);
  const [showHint2, setShowHint2] = useState(false);
  const [showHint3, setShowHint3] = useState(false);

  const handleM1Hint1 = async () => {
    if (session.user.hints1used == 0) {
      const response = await fetch("/api/auth/updateHints", {
        method: "POST",
        body: JSON.stringify({
          username: session.user.username,
          currMiss: 1,
        }),
      });
      if (response.status === 200) {
        console.log("success");
        setShowHint1(true);
        setUsedHint1(true);
        setCanUseHint1(false);
        update({ hints1used: 1 });
      }
    }
  };

  const handleM1Hint2 = async () => {
    if (session.user.hints1used == 1) {
      const response = await fetch("/api/auth/updateHints", {
        method: "POST",
        body: JSON.stringify({
          username: session.user.username,
          currMiss: 1,
        }),
      });
      if (response.status === 200) {
        console.log("success");
        setShowHint2(true);
        setUsedHint2(true);
        setCanUseHint2(false);
        update({ hints1used: 2 });
      }
    }
  };

  const handleM1Hint3 = async () => {
    if (session.user.hints1used == 2) {
      const response = await fetch("/api/auth/updateHints", {
        method: "POST",
        body: JSON.stringify({
          username: session.user.username,
          currMiss: 1,
        }),
      });
      if (response.status === 200) {
        console.log("success");
        setShowHint3(true);
        setUsedHint3(true);
        setCanUseHint3(false);
        update({ hints1used: 3 });
      }
    }
  };

  const handleM1Submit = async () => {
    if (
      (submission === "Talha ibn Ubayd Allah" ||
        submission === "Talha ibn 'Ubayd Allah") &&
      session.user.mission === 1
    ) {
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
        setCanUseHint1(false);
        setCanUseHint2(false);
        setCanUseHint3(false);
        update({ mission: 2 });
        console.log(session);
      } else {
        setIsGreen(false);
        setSubmitMessage("An error has occurred. Please try again.");
      }
    } else if (!(session.user.mission === 1)) {
      setIsGreen(false);
      setCanUseHint1(false);
      setCanUseHint2(false);
      setCanUseHint3(false);

      setSubmitMessage("You have already completed this mission.");
    } else {
      setIsGreen(false);
      setSubmitMessage("Incorrect.");
      if (session.user.hints1used == 0) {
        setCanUseHint1(true);
      } else if (session.user.hints1used == 1) {
        setCanUseHint2(true);
      } else if (session.user.hints1used == 2) {
        setCanUseHint3(true);
      }
    }
  };

  return (
    <div className="h-full justify-center text-center pb-16 sm:mx-auto sm:w-full sm:max-w-lg flex flex-col items-center ">
      <iframe
        className="w-full h-full"
        src="https://www.youtube.com/embed/vvEvBzUisXs"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Mission 1 Video"
      ></iframe>

      {/* <video className="w-full" controls>
        <source src="/videos/Mission1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <div className="flex flex-col items-center text-center sm:w-3/4 w-full">
        <div
          className={`dark:text-white text-black text-2xl py-8 ${poseyFont.className}`}
        >
          Mission 1 Submission
        </div>
        <input
          id="missionAnswer"
          name="missionAnswer"
          type="text"
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
            onClick={handleM1Submit}
            disabled={!submission}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Submit (Use Wikipedia Spelling)
          </button>

          <button
            onClick={handleM1Hint1}
            disabled={!canUseHint1}
            className="disabled:opacity-40 flex w-3/4 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Use Hint 1 (Time Penalty)
          </button>
          {showHint1 && (
            <p className="text-white w-full">
              Did you find the link hidden in the video? Those numbers in the
              end are hexadecimal; they can be converted...
            </p>
          )}
          <button
            onClick={handleM1Hint2}
            disabled={!canUseHint2}
            className="disabled:opacity-40 flex w-3/4 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Use Hint 2 (Time Penalty)
          </button>
          {showHint2 && (
            <p className="text-white w-full">
              {" "}
              The posters symbolize events from the Seerah; put them in order.
            </p>
          )}
          <button
            onClick={handleM1Hint3}
            disabled={!canUseHint3}
            className="disabled:opacity-40 flex w-3/4 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Use Hint 3 (Time Penalty)
          </button>
          {showHint3 && (
            <p className="text-white w-full">
              {" "}
              Black screen? Or is it? Play around with the brightness and
              contrast.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mission1Page;
