"use client";

import React, { useState, ChangeEvent } from "react";

interface Mission1InputProps {
  onSubmit: (submission: string) => void;
}

const Mission1Input: React.FC<Mission1InputProps> = ({ onSubmit }) => {
  const [submission, setSubmission] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmission(e.target.value);
    setIsCorrect(true); // Reset error state when input changes
  };

  const handleM1Submit = () => {
    if (submission === "Test") {
      onSubmit(submission);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="h-full justify-center pb-16 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center ">
      <input
        id="mission1answer"
        name="mission1answer"
        type="text" // Changed to text type for username input
        autoComplete="Enter Answer"
        value={submission}
        onChange={handleInputChange}
        required
        className={`block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 ${
          !isCorrect && "border-red-500"
        } `}
      />
      {!isCorrect && <p className="text-red-500 pt-3 w-full">Incorrect.</p>}
    </div>
  );
};

export default Mission1Input;
