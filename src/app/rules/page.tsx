import React from "react";

const RulesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 dark:text-white text-dark max-w-4xl">
      <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6 md:p-10 outline outline-2 dark:outline-red-900/50 outline-red-700/60">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {`Reality Quest: Resilience! In the Portals of Andalus`}
        </h1>

        <div className="border-b border-neutral-500 w-[90%] mx-auto mb-6" />
        <p className="mb-6 text-center">
          {`The Reality Quest is an immersive, escape-room-style scavenger hunt
          crafted specifically for high school and post-secondary youth. It's
          designed to push your critical thinking, problem-solving, and tenacity
          to the limit.`}
        </p>
        <p className="mb-4 text-left">
          {`This year's RQ will take a deep dive on the 700+ year Muslim presence
          on the Iberian peninsula... From its dramatic liberation, to its
          bitter destruction and the numerous ups and downs in between,
          Andalusia truly exemplifies the "turning of the tides" in our history
          and offers us many meaningful lessons in belief and action.`}
        </p>
        <p className="mb-4 text-left">
          {`This isn't just a game—it's a multi-layered interactive adventure that
          unfolds over three unique missions during the three days of the MAC
          Convention 2024.`}
        </p>
        <p className="mb-2 text-left font-medium">
          {`Each mission will challenge you to:`}
        </p>
        <ul className="list-disc list-inside mb-6 pl-4">
          <li>{`Search for clues`}</li>
          <li>{`Solve complex puzzles`}</li>
          <li>{`Crack hidden codes`}</li>
          <li>{`Navigate physical and digital spaces`}</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-left">
          {`Who Can Join?`}
        </h2>
        <p className="mb-4 text-left">
          {`Open to high school and post-secondary students.`}
        </p>
        <p className="mb-6 text-left">
          {`While registration and prizes are awarded individually this year,
          teamwork and collaboration are encouraged! With more minds working
          together, you'll increase your chances of cracking the code and
          winning the challenge.`}
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-left">
          {`Requirements to Participate:`}
        </h2>
        <p className="mb-4 text-left">
          {`Each participant must purchase a ticket to the MAC Convention 2024`}
        </p>
        <p className="mb-6 text-left">
          {`Registration for the quest is required in the portal above. The
          starting clues will be broadcast daily at 12:00pm from the Youth
          Stream. You may access the competition (submission and prompts) at any
          time from the portal. You DO NOT need to participate everyday to be
          eligible for prizes; each day is a new competition and mission!`}
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-left">
          {`What's at Stake?`}
        </h2>
        <p className="mb-4 text-left">
          {`Amazing prizes will be awarded EACH DAY for the first 2 finishers,
          inshaAllah!`}
        </p>
        <p className="mb-2 text-left font-medium">
          {`But more than the prizes, you'll gain:`}
        </p>
        <ul className="list-disc list-inside mb-8 pl-4">
          <li>{`New friendships`}</li>
          <li>{`Historical insight applicable to today's world`}</li>
          <li>{`Sharper thinking`}</li>
          <li>{`Unforgettable memories`}</li>
        </ul>
        <p className="mb-12 text-left font-medium">
          {`Are You Ready? Bring an open mind, quick reflexes, and your game face.`}
        </p>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {`Reality is waiting. Are you up for the challenge?`}
        </h2>
      </div>
    </div>
  );
};

export default RulesPage;
