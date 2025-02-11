"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";
import HintButton from "./HintButton";

const poseyFont = localFont({
  src: "../../../../public/fonts/posey-textured.ttf",
});

interface MissionData {
  video: string;
  answer: string[];
  hint1: string;
  hint2: string;
  hint3: string;
}

const missionData: { [key: number]: MissionData } = {
  1: {
    video: "https://www.youtube.com/embed/vvEvBzUisXs",
    answer: ["Talha ibn Ubayd Allah", "Talha ibn 'Ubayd Allah"],
    hint1:
      "Did you find the link hidden in the video? Those numbers in the end are hexadecimal; they can be converted...",
    hint2: "The posters symbolize events from the Seerah; put them in order.",
    hint3:
      "Black screen? Or is it? Play around with the brightness and contrast.",
  },
  2: {
    video: "https://www.youtube.com/embed/5yP4FtvkkKw?si=WvxWZzLzq6kUs_qn",
    answer: ["Ahmad ibn Hanbal"],
    hint1:
      "Riddle me this Riddle me that! What it's saying is that you need to find the place in the convention that people stand in lines. Here's the hint: the big magical stairs.",
    hint2: "The video had two pauses; which letters were replaced?",
    hint3: "What happens if you overlay the two maps? Also horse code",
  },
  3: {
    video: "https://www.youtube.com/embed/Z43NS_BL0eE?si=1V0LdR3175AEbhha",
    answer: ["Mark Sykes"],
    hint1:
      "Since this is the last mission don't expect the hints to be too helpful. There are 2 different audio tricks done on the video: Re- and...",
    hint2:
      "Retrace your steps means go back to where you went before in the convention center. Look in places you didn't look in before.",
    hint3: "",
  },
};

const MissionForm = ({ mission }: { mission: number }) => {
  const { data: session, update } = useSession() as any;

  const [submission, setSubmission] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [showHintCounter, setShowHintCounter] = useState(0);

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

  const handleSubmit = async () => {
    setIsCorrect(false);

    if (!(session.user.mission === mission)) {
      setSubmitMessage("You have already completed this mission.");
      return;
    }

    if (!missionData[mission].answer.includes(submission)) {
      setSubmitMessage("Incorrect.");
      return;
    }

    const response = await fetch("/api/auth/updateMission", {
      method: "POST",
      body: JSON.stringify({
        username: session.user.username,
        setMission: mission === 3 ? -1 : mission + 1,
      }),
    });

    if (response.status === 200) {
      setIsCorrect(true);
      setSubmitMessage("Correct! Well done, proceed to mission 2.");
      update({ mission: mission === 3 ? -1 : mission + 1 });
      return;
    }

    setSubmitMessage("An error has occurred. Please try again.");
  };

  return (
    <div className="h-full justify-center text-center pb-16 sm:mx-auto sm:w-full sm:max-w-lg flex flex-col items-center overflow-auto ">
      <div className="flex flex-col items-center text-center sm:w-3/4 w-full overflow-auto ">
        <iframe
          className="w-full h-full "
          src={missionData[mission].video}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={`Mission ${mission} Video`}
        ></iframe>
        <div
          className={`dark:text-white text-black text-2xl py-8 ${poseyFont.className}`}
        >
          Mission {mission} Submission
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
        {submitMessage && isCorrect && (
          <p className="text-green-500 pt-3 sm:w-full w-3/4">{submitMessage}</p>
        )}
        {submitMessage && !isCorrect && (
          <p className="text-red-500 pt-3 sm:w-full w-3/4">{submitMessage}</p>
        )}
        <div className=" flex flex-col text-center items-center gap-y-5 sm:w-full w-3/4 py-4">
          <button
            onClick={handleSubmit}
            disabled={!submission}
            className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Submit (Use Wikipedia Spelling)
          </button>
          <HintButton
            hintNum={1}
            hintMessage={missionData[mission].hint1}
            mission={mission}
            showHintCounter={showHintCounter}
            setShowHintCounter={setShowHintCounter}
          />

          <HintButton
            hintNum={2}
            hintMessage={missionData[mission].hint2}
            mission={mission}
            showHintCounter={showHintCounter}
            setShowHintCounter={setShowHintCounter}
          />

          <HintButton
            hintNum={3}
            hintMessage={missionData[mission].hint3}
            mission={mission}
            showHintCounter={showHintCounter}
            setShowHintCounter={setShowHintCounter}
          />
        </div>
      </div>
    </div>
  );
};

export default MissionForm;
