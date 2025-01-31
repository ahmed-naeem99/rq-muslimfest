"use client";

import React, { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  timecompleted: string | null;
  hintsused: number;
}

const LeaderBoardPage = () => {
  const [leaderboard, setLeaderboard] = useState<User[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        console.log(data);
        const penalizedData = data.map((user: User) => ({
          ...user,
          timecompleted: adjustCompletionTime(
            user.timecompleted,
            user.hintsused
          ),
        }));
        console.log(penalizedData);
        const sortedData = penalizedData.sort((a: User, b: User) => {
          if (!a.timecompleted) return 1;
          if (!b.timecompleted) return -1;
          return (
            new Date(a.timecompleted).getTime() -
            new Date(b.timecompleted).getTime()
          );
        });
        setLeaderboard(sortedData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
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

  return (
    <div className="flex flex-col text-center mt-11 dark:text-white items-center">
      <h1 className="text-2xl mb-4">Leaderboard</h1>
      <table className="w-[60%] bg-white dark:bg-red-400 transition-all">
        <thead>
          <tr>
            <th className="py-2">Position</th>
            <th className="py-2">User</th>
            <th className="py-2">Completion Time</th>
            <th className="py-2">Hints Used</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user: User, index: number) => (
            <tr key={user.id} className="border-t">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{user.username}</td>
              <td className="py-2">{formatDate(user.timecompleted)}</td>
              <td className="py-2">{user.hintsused}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoardPage;
