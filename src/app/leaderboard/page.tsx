import React from "react";
import LeaderBoardTable from "../components/Leaderboard";

const LeaderboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">
        Leaderboard
      </h1>
      <div className="flex justify-center text-center mb-4">
        <p className="text-md text-center w-[90%] sm:w-[70%] lg:w-[40%] text-gray-500">
          Note that missions completed after the submission window has closed
          are not considered in the rankings.
        </p>
      </div>
      <div className="flex flex-row gap-8 justify-center items-center flex-wrap">
        <LeaderBoardTable mission={1} />
        <LeaderBoardTable mission={2} />
      </div>
    </div>
  );
};

export default LeaderboardPage;
