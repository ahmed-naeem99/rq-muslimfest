import React from "react";

const RulesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 dark:text-white text-dark max-w-4xl">
      <div className="bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6 md:p-10 outline outline-2 dark:outline-red-900/50 outline-red-700/60">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {`Reality Quest: The Golden Thread`}
        </h1>

        <div className="border-b border-neutral-500 w-[90%] mx-auto mb-6" />
        <p className="mb-6 text-center">
          {`Join us for Reality Quest, a unique scavenger hunt 
          experience created by Escape Arena, happening live at 
          MuslimFest 2025.Over the course of three days, you will
          take on three different missions across Celebration Square. 
          Each one will involve solving puzzles, cracking codes, and 
          thinking creatively while working as a team to complete the 
          challenge in time.`}
        </p>
        <p className="mb-4 text-left">
          {`What to expect:
            ‍🔍 Find hidden clues
            🧠 Solve creative puzzles
            💻 Navigate both physical and digital tasks
            🏆 Win daily prizes including Gift Cards, Headphones, 
            Gaming Consoles and more!`}
        </p>
        <p className="mb-4 text-left">
          {`Theme: The Golden Thread
            ‍This year’s challenge is set in the 1890s, 
            inspired by the historical story of the Ottoman 
            Hejaz railway, a project that aimed to connect the 
            Muslim world in a time of major change. 
            Through the missions, teams will uncover real stories 
            and reflect on questions that shaped that era.`}
        </p>
        <p className="mb-2 text-left font-medium">
          {`‍Things to Know:`}
        </p>
        <ul className="list-disc list-inside mb-6 pl-4">
          <li>{`‍📍 Location: MuslimFest at Celebration Square`}</li>
          <li>{`🎟️ Fee: $5 per participant`}</li>
          <li>{`👥 Team Size: 1 to 4 participants`}</li>
          <li>{`🕒 Missions run daily (August 29 to 31)`}</li>
          <li>{`➡️ Clues released at 2pm on Friday, and 12pm on Saturday and Sunday | Submissions due by 8pm each day`}</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-left">
          {`You can join just one mission or try all three. No prior experience is needed.`}
        </h2>
        <h2 className="text-2xl font-semibold mt-6 mb-3 text-left">
          {`Who Can Join?`}
        </h2>
        <p className="mb-4 text-left">
          {`Open to anyone 13+ (geared to highschool and university students; incredible difficulty)`}
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
        <p className="mb-6 text-left">
          {`Registration for the quest is required in the portal above. 
          The starting clues will be broadcast daily from the EA Booth. 
          You may access the competition (submission and prompts) at any time 
          from the portal. You DO NOT need to participate everyday to be eligible 
          for prizes; each day is a new competition and mission!`}
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3 text-left">
          {`What's at Stake?`}
        </h2>
        <p className="mb-4 text-left">
          {`Amazing prizes will be awarded EACH DAY for the first 3 finishers, 
          inshaAllah! as well as a grand $500 prize`}
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
