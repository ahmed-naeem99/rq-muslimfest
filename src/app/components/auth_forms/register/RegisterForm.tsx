"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import realityQuestLogo from "../../../../../public/rqlogo.svg";
import TeamMembers from "./TeamMembers";

interface TeamMember {
  name: string;
  email: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    username: "",
    password: "",
    fullName: "",
    age: "",
    general: "",
  });

  const [ticket, setTicket] = useState(false);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: "", email: email },
  ]);

  const [teamErrorMessages, setTeamErrorMessages] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    if (teamMembers[0].email !== email) {
      const updatedTeam = [...teamMembers];
      updatedTeam[0] = {
        ...updatedTeam[0],
        email: email,
      };
      setTeamMembers(updatedTeam);
    }
  }, [email, teamMembers]);

  const router = useRouter();

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;
    if (usernameRegex.test(username)) {
      setErrorMessages((prev) => ({ ...prev, username: "" }));
      return true;
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        username:
          "Invalid username format. Username must be 3-36 characters long and contain only letters, numbers, and underscores.",
      }));
      return false;
    }
  };

  const validatePasswords = (password: string, rePassword: string) => {
    if (password != rePassword) {
      setErrorMessages((prev) => ({
        ...prev,
        password: "Passwords do not match.",
      }));
      return false;
    } else {
      setErrorMessages((prev) => ({ ...prev, password: "" }));
      return true;
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setErrorMessages((prev) => ({ ...prev, email: "" }));
      return true;
    } else {
      setErrorMessages((prev) => ({ ...prev, email: "Invalid email format." }));
      return false;
    }
  };

  const validateTeamMembers = (teamMembers: TeamMember[]) => {
    const invalidMembers: { [key: number]: string } = {};
    teamMembers.forEach((member, index) => {
      if (!member.name && !member.email) {
        invalidMembers[index] = "Name and email are required.";
      } else if (!member.name) {
        invalidMembers[index] = "Name is required.";
      } else if (!member.email) {
        invalidMembers[index] = "Email is required.";
      } else if (!validateEmail(member.email)) {
        invalidMembers[index] = "Invalid email format.";
      }
    });
    if (Object.keys(invalidMembers).length > 0) {
      setTeamErrorMessages(invalidMembers);
      return false;
    } else {
      setTeamErrorMessages({});
      return true;
    }
  };

  const validateFullName = (name: string) => {
    if (name.trim() === "") {
      setErrorMessages((prev) => ({
        ...prev,
        fullName: "Full name is required.",
      }));
      return false;
    } else {
      setErrorMessages((prev) => ({ ...prev, fullName: "" }));
      return true;
    }
  };

  const validateAge = (age: string) => {
    const ageNumber = Number(age);
    if (ageNumber <= 0 || ageNumber > 150) {
      setErrorMessages((prev) => ({
        ...prev,
        age: "Invalid age.",
      }));
      return false;
    } else {
      setErrorMessages((prev) => ({ ...prev, age: "" }));
      return true;
    }
  };

  const handleClientErrors = () => {
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePasswords(password, rePassword);
    const isTeamMembersValid = validateTeamMembers(teamMembers);
    const isFullNameValid = validateFullName(fullName);
    const isAgeValid = validateAge(age);

    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isFullNameValid &&
      isAgeValid
    ) {
      return true;
    }
    return false;
  };

    const handleServerErrors = (result: any) => {
    setErrorMessages({
      email: "",
      username: "",
      password: "",
      fullName: "",
      age: "",
      general: "",
    });
    setTeamErrorMessages({});

    // Check if result has a code property
    const errorCode = result?.code;

    switch (errorCode) {
      case "EMAIL_EXISTS":
        setErrorMessages((prev) => ({
          ...prev,
          email: "Email already exists.",
        }));
        break;
      case "USERNAME_EXISTS":
        setErrorMessages((prev) => ({
          ...prev,
          username: "Username already exists.",
        }));
        break;
      default:
        setErrorMessages((prev) => ({
          ...prev,
          general: result?.message || "An unknown error occurred.",
        }));
        break;
    }
  };

    const handleSignUp = async () => {
    if (!handleClientErrors()) {
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          fullName: fullName,
          age: age,
          ticket: ticket,
          teamMembers: teamMembers,
        }),
      });

      if (response.ok) {
        router.push("/login");
        router.refresh();
      } else {
        try {
          const result = await response.json();
          handleServerErrors(result);
        } catch (e) {
          // If response is not JSON, use a generic error
          setErrorMessages(prev => ({
            ...prev,
            general: "An error occurred during registration.",
          }));
        }
      }
    } catch (error) {
      setErrorMessages(prev => ({
        ...prev,
        general: "Network error. Please try again.",
      }));
    }
  };

  return (
    <div className="grid place-items-center py-16">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center pb-2">
        <Image priority src={realityQuestLogo} alt="Logo" width={300} />
        <h2 className="px-2 pb-8 mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-dark dark:text-white">
          Create a New Team
        </h2>
      </div>
      <div className="flex flex-1 flex-col w-full lg:flex-row lg:px-16 lg:gap-16 justify-center items-center pb-16  gap-8">
        <div className="max-[400px]:w-[80%] w-[70%] md:w-[50%] lg:max-w-[450px] flex flex-col">
          <h2 className="text-center text-lg font-bold leading-9 pb-4 tracking-tight text-dark dark:text-white">
            Account Information
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col gap-12 lg:gap-16 bg-white dark:bg-zinc-600/20 p-6 rounded-lg shadow-md">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6  text-dark dark:text-white"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    required
                    className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                  {errorMessages.username && (
                    <p className="text-red-500 pt-3 w-full max-w-xs">
                      {errorMessages.username}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6  text-dark dark:text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                  {errorMessages.email && (
                    <p className="text-red-500 pt-3 w-full max-w-xs">
                      {errorMessages.email}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6  text-dark dark:text-white"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                  {errorMessages.password && (
                    <p className="text-red-500 pt-3 w-full max-w-xs">
                      {errorMessages.password}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6  text-dark dark:text-white"
                  >
                    Re-enter Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                    className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="w-full border-t border-gray-400" />
              <div className="flex flex-row gap-4">
                <div className="w-full">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium leading-6 text-dark dark:text-white"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium leading-6 text-dark dark:text-white"
                  >
                    Age
                  </label>
                  <div className="mt-2">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      onKeyDown={(e) => {
                        if (e.key === "-" || e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (
                          (value > 0 && value < 151) ||
                          e.target.value === ""
                        ) {
                          setAge(e.target.value);
                        } else {
                          setAge("");
                        }
                      }}
                      value={age}
                      min={1}
                      max={150}
                      required
                      className="block px-3 w-full rounded-md border-0 bg-black/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {<div className="flex flex-col w-auto lg:max-w-[700px]">
          <h2 className="text-center text-lg pb-4 font-bold leading-9 tracking-tight text-dark dark:text-white">
            Team Information
          </h2>

          <div className="bg-white dark:bg-zinc-600/20 sm:mx-12 md:mx-0 p-6 rounded-lg shadow-md">
            <TeamMembers
              teamMembers={teamMembers}
              setTeamMembers={setTeamMembers}
              teamErrorMessages={teamErrorMessages}
            />
          </div>
        </div>}
      </div>
      <div>
        {errorMessages.general && (
          <p className="text-red-500 pb-3 w-full max-w-xs text-center">
            {errorMessages.general}
          </p>
        )}
        <button
          onClick={handleSignUp}
          disabled={
            !email || !password || !username || !rePassword || !fullName || !age
          }
          className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-8 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
