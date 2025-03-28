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
      className="btn btn-ghost btn-circle"
      onClick={() => setDarkMode(!darkMode)}
    >
      <div className={`${darkMode ? "inline" : "hidden"}`}>
        <FaMoon className="text-white" size={18} />
      </div>
      <div className={`${darkMode ? "hidden" : "inline"}`}>
        <BsSunFill className="ml-auto text-black" size={22} />
      </div>
    </div>
  );
};

export default ThemeToggle;
