"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useHint } from "@/app/context/HintContext";

interface HintButtonProps {
  hintNum: number;
  hintMessage: string;
  mission: number;
}

const HintButton: React.FC<HintButtonProps> = ({
  hintNum,
  hintMessage,
  mission,
}) => {
  const { data: session, update } = useSession() as any;
  const { showHintCounter, setShowHintCounter } = useHint();

  const handleHint = async (hintNum: number) => {
    if (session.user[`hints${mission}used`] > hintNum - 1) {
      if (hintNum === showHintCounter) {
        setShowHintCounter(0);
      } else {
        setShowHintCounter(hintNum);
      }
      return;
    }

    const response = await fetch("/api/auth/updateHints", {
      method: "POST",
      body: JSON.stringify({
        username: session.user.username,
        currMiss: mission,
      }),
    });
    if (response.status === 200) {
      update({ [`hints${mission}used`]: hintNum });
      setShowHintCounter(hintNum);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <button
        onClick={() => handleHint(hintNum)}
        disabled={
          session.user[`hints${mission}used`] < hintNum - 1 ||
          (session.user[`hints${mission}used`] <= hintNum - 1 &&
            session.user.mission != mission)
        }
        className="disabled:opacity-40 flex w-3/4 justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        {session.user[`hints${mission}used`] > hintNum - 1
          ? `Show Hint ${hintNum}`
          : `Use Hint ${hintNum} (Time Penalty)`}
      </button>
      {showHintCounter == hintNum && (
        <p className="text-white w-full">{hintMessage}</p>
      )}
    </div>
  );
};

export default HintButton;
