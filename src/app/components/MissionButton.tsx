"use client";

import React from "react";

interface Mission1ButtonProps {
  onClick: () => void;
  disabled: boolean;
}

const Mission1Button: React.FC<Mission1ButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <div className=" w-full py-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        Submit
      </button>
    </div>
  );
};

export default Mission1Button;
