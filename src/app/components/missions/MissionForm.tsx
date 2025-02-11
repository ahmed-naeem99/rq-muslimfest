"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";

const poseyFont = localFont({
  src: "../../../../public/fonts/posey-textured.ttf",
});

const MissionForm = (mission: any) => {
  const { data: session, update } = useSession() as any;

  const [submission, setSubmission] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isGreen, setIsGreen] = useState(true);

  const [showHintCounter, setShowHintCounter] = useState(0);

  useEffect(() => {
    setShowHintCounter(session.user[`hints${mission}used`]);
  }, []);

  const handleHint = async (hintNum: number) => {
    if (session.user[`hints${mission}used`] <= hintNum - 1) {
      const response = await fetch("/api/auth/updateHints", {
        method: "POST",
        body: JSON.stringify({
          username: session.user.username,
          currMiss: mission,
        }),
      });
      if (response.status === 200) {
        update({ hints1used: hintNum });
      }
    } else {
      if (hintNum == showHintCounter) {
        setShowHintCounter(0);
      } else {
        setShowHintCounter(hintNum);
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
        update({ mission: 2 });
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
    <div className="h-full justify-center text-center pb-16 sm:mx-auto sm:w-full sm:max-w-lg flex flex-col items-center overflow-auto ">
      <div className="flex flex-col items-center text-center sm:w-3/4 w-full overflow-auto ">
        <iframe
          className="w-full h-full "
          src="https://www.youtube.com/embed/vvEvBzUisXs"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Mission 1 Video"
        ></iframe>
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
            onClick={() => handleHint(1)}
            disabled={
              session.user[`hints${mission}used`] == 0 &&
              session.user.mission != mission
            }
            className="disabled:opacity-40 flex w-3/4 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Use Hint 1 (Time Penalty)
          </button>
          {showHintCounter == 1 && (
            <p className="text-white w-full">
              Did you find the link hidden in the video? Those numbers in the
              end are hexadecimal; they can be converted...
            </p>
          )}
          <button
            onClick={() => handleHint(2)}
            disabled={
              session.user[`hints${mission}used`] < 1 ||
              (session.user[`hints${mission}used`] < 1 &&
                session.user.mission != mission)
            }
            className="disabled:opacity-40 flex w-3/4 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Use Hint 2 (Time Penalty)
          </button>
          {showHintCounter == 2 && (
            <p className="text-white w-full">
              {" "}
              The posters symbolize events from the Seerah; put them in order.
            </p>
          )}
          <button
            onClick={() => handleHint(3)}
            disabled={
              session.user[`hints${mission}used`] < 2 ||
              (session.user[`hints${mission}used`] < 2 &&
                session.user.mission != mission)
            }
            className="disabled:opacity-40 flex w-3/4 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Use Hint 3 (Time Penalty)
          </button>
          {showHintCounter == 3 && (
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

export default MissionForm;
