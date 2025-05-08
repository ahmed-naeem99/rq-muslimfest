"use client";

import { useState, useEffect } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

interface TeamMember {
  name: string;
  email: string;
}

interface TeamMembersProps {
  accountEmail: string;
  onTeamChange: (team: TeamMember[]) => void;
}

export default function TeamMembers({
  accountEmail,
  onTeamChange,
}: TeamMembersProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "", email: accountEmail },
  ]);

  // Update first member's email when accountEmail changes
  useEffect(() => {
    if (teamMembers[0].email !== accountEmail) {
      const updatedTeamMembers = [...teamMembers];
      updatedTeamMembers[0] = {
        ...updatedTeamMembers[0],
        email: accountEmail,
      };
      setTeamMembers(updatedTeamMembers);
      onTeamChange(updatedTeamMembers);
    }
  }, [accountEmail]);

  const addTeamMember = () => {
    if (teamMembers.length < 5) {
      const newTeamMembers = [...teamMembers, { name: "", email: "" }];
      setTeamMembers(newTeamMembers);
      onTeamChange(newTeamMembers);
    }
  };

  const removeTeamMember = (index: number) => {
    if (index === 0) return; // Can't remove the first member
    if (teamMembers.length > 1) {
      const newTeamMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(newTeamMembers);
      onTeamChange(newTeamMembers);
    }
  };

  const updateTeamMember = (
    index: number,
    field: "name" | "email",
    value: string
  ) => {
    if (index === 0 && field === "email") return; // Can't change the account email for first member

    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = {
      ...newTeamMembers[index],
      [field]: value,
    };

    setTeamMembers(newTeamMembers);
    onTeamChange(newTeamMembers);
  };

  return (
    <div className="space-y-6 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium dark:text-white text-gray-800">
          Team Members
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={addTeamMember}
            disabled={teamMembers.length >= 5}
            className={`p-2 rounded-full ${
              teamMembers.length >= 5
                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                : "bg-sky-100 dark:bg-sky-900 hover:bg-sky-200 dark:hover:bg-sky-800"
            }`}
            title={
              teamMembers.length >= 5
                ? "Maximum 5 team members"
                : "Add team member"
            }
          >
            <FiPlus className="text-sky-600 dark:text-sky-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {teamMembers.map((member, index) => (
          <div className="flex flex-row gap-6 items-top" key={index}>
            <div className="flex flex-col sm:flex-row gap-4 items-start md:items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                  {index === 0 ? "Your Name" : `Team Member ${index + 1} Name`}
                </label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) =>
                    updateTeamMember(index, "name", e.target.value)
                  }
                  className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  placeholder="Enter Name"
                />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-1">
                  {index === 0
                    ? "Your Email"
                    : `Team Member ${index + 1} Email`}
                </label>
                <input
                  type="email"
                  value={member.email}
                  onChange={(e) =>
                    updateTeamMember(index, "email", e.target.value)
                  }
                  disabled={index === 0}
                  className={`block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6
                        ${
                          index === 0
                            ? "bg-gray-300 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                            : ""
                        }`}
                  placeholder={`${index === 0 ? "Account" : "Enter"} Email`}
                />
              </div>
            </div>
            <div>
              {index > 0 && (
                <button
                  onClick={() => removeTeamMember(index)}
                  className="mt-6 p-2 rounded-full bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800"
                  title="Remove team member"
                >
                  <FiMinus className="text-red-600 dark:text-red-400" />
                </button>
              )}

              {index == 0 && <span className="pr-8 rounded-full" />}
            </div>
          </div>
        ))}

        <div className="text-sm text-gray-500 dark:text-gray-400">
          {teamMembers.length === 5 ? (
            <span>Maximum team size reached (5 members)</span>
          ) : (
            <span>
              You can add up to {5 - teamMembers.length} more team{" "}
              {teamMembers.length === 4 ? "member" : "members"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
