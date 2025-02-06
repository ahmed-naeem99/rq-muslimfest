"use client";

import React, { useEffect, useState } from "react";

interface User {
  username: string;
  timecompleted: string | null;
  hintsused: number;
  role: string;
  finaltime: string | null;
}

const LeaderBoardPage = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        console.log(response);
        const data = await response.json();
        console.log(data);
        if (response.status !== 200) throw new Error(data.message);

        const penalizedData = data.result
          .filter((user: User) => user.role === "player")
          .map((user: User) => ({
            ...user,
            finaltime: adjustCompletionTime(user.timecompleted, user.hintsused),
          }));
        const sortedData = penalizedData.sort((a: User, b: User) => {
          if (!a.finaltime) return 1;
          if (!b.finaltime) return -1;
          return (
            new Date(a.finaltime).getTime() - new Date(b.finaltime).getTime()
          );
        });
        setLeaderboard(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const adjustCompletionTime = (
    dateString: string | null,
    hintsUsed: number
  ) => {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    if (hintsUsed < 9) {
      date.setMinutes(date.getMinutes() + 5 * hintsUsed);
    } else {
      date.setMinutes(date.getMinutes() + 45);
    }
    return date.toISOString();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return "Not completed";
    }
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/New_York",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return (
      <div className="flex flex-col text-center mt-11 dark:text-white items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col text-center mt-11 dark:text-white items-center py-12 min-w-fit overflow-auto">
      <h1 className="text-3xl mb-6 font-bold">Leaderboard</h1>
      <div className="flex flex-col items-center min-w-fit sm:w-[90%] md:w-[80%] xl:w-[60%] text-sm lg:text-[16px] dark:bg-gray-300 bg-neutral-400 p-2 rounded-xl">
        <table className="w-full text-gray-800 dark:text-gray-200 bg-white dark:bg-neutral-700  transition-all rounded-lg overflow-x-auto whitespace-nowrap ">
          <thead>
            <tr>
              <th className="py-2 px-3">#</th>
              <th className="py-2 px-3">Team</th>
              <th className="py-2 px-3">Completion</th>
              <th className="py-2 px-3">Hints Used</th>
              <th className="py-2 px-10">Final Time</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((user: User, index: number) => (
              <tr
                key={user.username}
                className={`border-t ${
                  index === 0
                    ? "bg-[#e6daa1] dark:bg-[#a89d72] font-bold"
                    : index === 1
                    ? "bg-stone-400/70 font-bold"
                    : index === 2
                    ? "bg-amber-900/30 font-bold"
                    : ""
                }`}
              >
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{user.username}</td>
                <td className="py-2">{formatDate(user.timecompleted)}</td>
                <td className="py-2">{user.hintsused}</td>
                <td className="py-2">{formatDate(user.finaltime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
