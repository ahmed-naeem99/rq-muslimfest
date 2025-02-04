"use client";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true);

  // useEffect(() => {
  //   const theme = localStorage.getItem("theme");
  //   if (theme === "dark") setDarkMode(true);
  // }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      // localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      // localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-sky-800 cursor-pointer rounded-full p-1"
      onClick={() => setDarkMode(!darkMode)}
    >
      <FaMoon className="text-white" size={18} />
      <div
        className="absolute bg-white w-7 h-7 rounded-full shadow-md transform duration-1000"
        style={{
          left: darkMode ? "2px" : "35px",
          transition: "left 0.3s cubic-bezier(0, 0, 0.05, 0.99) 0s",
        }}
      ></div>
      <BsSunFill className="ml-auto text-sky-600" size={18} />
    </div>
  );
};

export default ThemeToggle;
