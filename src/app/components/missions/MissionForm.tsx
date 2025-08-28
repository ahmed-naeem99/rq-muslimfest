"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import localFont from "next/font/local";
import Image from "next/image";
import HintButton from "./HintButton";

const poseyFont = localFont({
  src: "../../../../public/fonts/posey-textured.ttf",
});

interface MissionData {
  title: string;
  image: string;   // ✅ now image instead of video
  answer: string[];
  hint1: string;
  hint2: string;
  hint3: string;
}

export const missionData: { [key: number]: MissionData } = {
  1: {
    title: "Mission 1: Turmoil",
    image: "/missionImages/mission1.png",
    answer: ["Muhammad Ali Pasha", "Muhamaad Ali of Egypt"],
    hint1: "hint1",
    hint2: "hint2",
    hint3: "hint3",
  },
  2: {
    title: "Mission 2: Duality",
    image: "/missionImages/mission2.png",
    answer: ["Mustafa Sabri", "Mustafa Sabri Effendi"],
    hint1: "hint1",
    hint2: "hint2",
    hint3: "hint3",
  },
  3: {
    title: "Mission 3: Criterion",
    image: "",
    answer: ["Your Answer Here"],
    hint1: "First hint",
    hint2: "Second hint",
    hint3: "Third hint",
  },
};

const MissionForm = ({ mission }: { mission: number }) => {
  const { data: session } = useSession() as any;

  const [submission, setSubmission] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHintCounter, setShowHintCounter] = useState(0);
  const [timeCompleted, setTimeCompleted] = useState<string | null>(null);

  const [countdownString, setCountdownString] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // 🔑 Unlock schedule
  const missionUnlockDates: { [key: number]: Date } = {
    1: new Date("2025-08-29T18:00:00Z"), // Friday 2PM EST
    2: new Date("2025-08-30T16:00:00Z"), // Saturday 12PM EST
    3: new Date("2025-08-31T16:00:00Z"), // Sunday 12PM EST
  };

  const unlockDate = missionUnlockDates[mission].getTime();

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const distance = unlockDate - now;

      if (distance <= 0) {
        setIsUnlocked(true);
        setCountdownString(null); // no countdown needed anymore
        return true;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdownString(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      return false;
    };

    const ended = calculateCountdown();
    let interval: NodeJS.Timeout | undefined;

    if (!ended) {
      interval = setInterval(() => {
        if (calculateCountdown()) {
          if (interval) clearInterval(interval);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [unlockDate]);

  // 🚫 Prevent submission before unlock
  const handleSubmit = async () => {
    if (!isUnlocked) {
      setSubmitMessage("This mission is not unlocked yet!");
      setIsCorrect(false);
      return;
    }

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
      setTimeCompleted(data.result.time_completed);
      setIsCorrect(true);
      setSubmitMessage("Correct! Check the leaderboards to view your ranking.");
      return;
    }

    setSubmitMessage("An error has occurred. Please try again.");
  };

  return (
    <div className="h-full justify-center text-center pb-16 md:mx-auto flex flex-col items-center overflow-auto min-h-screen">
      <div className="flex flex-col items-center text-center sm:w-3/4 w-full md:max-w-lg px-4">
        {/* ✅ Mission image instead of video */}
        <div className="w-full flex justify-center mt-13">
          <Image
            src={missionData[mission].image}
            alt={missionData[mission].title}
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>

        <div
          className={`dark:text-white text-black text-3xl py-8 font-bold font-serif ${poseyFont.className}`}
        >
          {missionData[mission].title}
        </div>

        <div className={`dark:text-white text-black text-lg py-4 font-bold`}>
          Time Limit
        </div>

        <div className="flex  justify-center gap-4 mb-8">
          {countdownString &&
            countdownString.split(" ").map((unit, index) => {
              const [value, label] = unit.split(/([a-z]+)/);
              return (
                <div
                  key={index}
                  className="flex flex-col items-center bg-gray-200/60 dark:bg-neutral-900 rounded-lg p-3 min-w-[70px] shadow-md"
                >
                  <span className="font-bold text-2xl dark:text-[#952727] text-[#b53131] ">
                    {value}
                  </span>
                  <span className="text-xs text-neutral-900 dark:text-gray-300">
                    {label === "d"
                      ? "DAYS"
                      : label === "h"
                      ? "HOURS"
                      : label === "m"
                      ? "MINUTES"
                      : "SECONDS"}
                  </span>
                </div>
              );
            })}
        </div>
        {!isUnlocked && (
          <div className="text-center text-red-500 font-bold my-4">
            Mission locked! Unlocks in: {countdownString}
          </div>
        )}
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
            disabled={!submission || !isUnlocked}
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
