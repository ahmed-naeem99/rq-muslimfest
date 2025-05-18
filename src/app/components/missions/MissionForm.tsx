"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";
import HintButton from "./HintButton";
import VideoFrame from "./MissionVideo";

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

export const missionData: { [key: number]: MissionData } = {
  1: {
    video:
      "https://drive.google.com/file/d/1wm6T6ly9WgkM07GDKF56iz-Ls8l_0kUf/preview",
    answer: ["Yusuf ibn Tashfin"],
    hint1: "You should know how to convert Hexadecimal to text.",
    hint2: "What is a language game?",
    hint3:
      "The 5th portal is not an actually in the convention; you must piece it together from the other portals",
  },
  2: {
    video: "https://www.youtube.com/embed/5yP4FtvkkKw?si=WvxWZzLzq6kUs_qn",
    answer: ["Ahmad ibn Hanbal"],
    hint1:
      "Riddle me this Riddle me that! What it's saying is that you need to find the place in the convention that people stand in lines. Here's the hint: the big magical stairs.",
    hint2: "The video had two pauses; which letters were replaced?",
    hint3: "What happens if you overlay the two maps? Also horse code",
  },
};

const MissionForm = ({ mission }: { mission: number }) => {
  const { data: session, update } = useSession() as any;

  const [submission, setSubmission] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHintCounter, setShowHintCounter] = useState(0);
  const [timeCompleted, setTimeCompleted] = useState<string | null>(null);

  useEffect(() => {
    const fetchMissionData = async () => {
      const response = await fetch("/api/auth/retrieveMission", {
        method: "POST",
        body: JSON.stringify({
          user_id: session.user.id,
          mission: mission,
        }),
      });

      const data = await response.json();
      setTimeCompleted(data.result.time_completed);
      setHintsUsed(data.result.hints_used);
    };

    fetchMissionData();
  }, [mission, session.user.id]);

  const handleSubmit = async () => {
    setIsCorrect(false);

    const completed = await fetch("/api/auth/retrieveMission", {
      method: "POST",
      body: JSON.stringify({
        user_id: session.user.id,
        mission: mission,
      }),
    });

    const completedData = await completed.json();
    if (completedData.result.time_completed !== null) {
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
        user_id: session.user.id,
        mission: mission,
      }),
    });

    if (response.status === 200) {
      const data = await response.json();

      const endDate = new Date("2025-05-17T20:00:00Z");
      const missionEndDate = new Date(
        endDate.getTime() + mission * 24 * 60 * 60 * 1000
      );

      const completionDate = new Date(data.result.time_completed);

      setTimeCompleted(data.result.time_completed);
      setIsCorrect(true);

      if (completionDate > missionEndDate) {
        setSubmitMessage(
          "Correct, well done! As the competition for this day is closed, your time will not be counted on the leaderboard."
        );
      } else {
        setSubmitMessage(
          "Correct! Check the leaderboards to view your ranking."
        );
      }

      return;
    }

    setSubmitMessage("An error has occurred. Please try again.");
  };

  return (
    <div className="h-full justify-center text-center pb-16 md:mx-auto flex flex-col items-center overflow-auto min-h-screen">
      <div className="flex flex-col items-center text-center sm:w-3/4 w-full md:max-w-lg px-4">
        <VideoFrame videoLink={missionData[mission].video} mission={mission} />
        <div
          className={`dark:text-white text-black text-2xl py-8 ${poseyFont.className}`}
        >
          Mission {mission} Submission
        </div>
        <input
          name="missionAnswer"
          onChange={(e) => setSubmission(e.target.value)}
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
            mission={mission}
            hintsUsed={hintsUsed}
            setHintsUsed={setHintsUsed}
            showHintCounter={showHintCounter}
            setShowHintCounter={setShowHintCounter}
            timeCompleted={timeCompleted}
          />

          <HintButton
            hintNum={2}
            mission={mission}
            hintsUsed={hintsUsed}
            setHintsUsed={setHintsUsed}
            showHintCounter={showHintCounter}
            setShowHintCounter={setShowHintCounter}
            timeCompleted={timeCompleted}
          />

          <HintButton
            hintNum={3}
            mission={mission}
            hintsUsed={hintsUsed}
            setHintsUsed={setHintsUsed}
            showHintCounter={showHintCounter}
            setShowHintCounter={setShowHintCounter}
            timeCompleted={timeCompleted}
          />
        </div>
      </div>
    </div>
  );
};

export default MissionForm;
