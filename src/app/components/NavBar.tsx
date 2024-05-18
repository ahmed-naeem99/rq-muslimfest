import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import localFont from "next/font/local";
import { getServerSession } from "next-auth";
import Logout from "./logout";

const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

const NavBar = async () => {
  const session = await getServerSession();
  return (
    <div className="navbar dark:text-white dark:focus:text-white transition-colors  rounded-3xl">
      {/* border-2 dark:border-gray-600/40 */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden px-0 pr-3 sm:px-4 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52   bg-sky-800 text-white"
          >
            {/* <li>
              <Link className="dark:focus:text-white" href="/login">
                LoginTest
              </Link>
            </li> */}
            <li>
              <a>Missions</a>
              <ul className="p-2">
                <li>
                  <Link
                    className="dark:focus:text-white dark:text-white"
                    href="/mission1"
                  >
                    M1
                  </Link>
                </li>
                <li>
                  <Link className="dark:focus:text-white" href="/mission2">
                    M2
                  </Link>
                </li>
                <li>
                  <Link className="dark:focus:text-white" href="/mission3">
                    M3
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="dark:focus:text-white" href="/leaderboard">
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost text-lg sm:text-3xl px-0 sm:px-4 font-normal"
        >
          <div className={poseyFont.className}>MAC Reality Quest</div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {/* <li>
            <Link className="dark:focus:text-white" href="/login">
              LoginTest
            </Link>
          </li> */}
          <li>
            <details>
              <summary>Missions</summary>
              <ul className="p-2  bg-sky-800">
                <li>
                  <Link
                    className="dark:focus:text-white text-white"
                    href="/mission1"
                  >
                    M1
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark:focus:text-white text-white"
                    href="/mission2"
                  >
                    M2
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark:focus:text-white text-white"
                    href="/mission3"
                  >
                    M3
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link
              className="dark:focus:text-white dark:text-white"
              href="/leaderboard"
            >
              Leaderboard
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end flex flex-row space-x-2 sm:space-x-4 items-center">
          <ThemeToggle />
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://i.imgur.com/AJ3InNO.png"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className=" mt-24 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52  bg-sky-800"
          >
            {!session && (
              <li>
                <Link className="text-white  justify-between" href="/login">
                  Login
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
            )}
            {/* {!!session && ( */}
            {/* <li>
                <Link className="text-white  justify-between" href="/profile">
                  Profile
                  {/* <span className="badge">New</span> */}
            {/* </Link> */}
            {/* </li> */}
            {/* )} */}
            {!!session && (
              <li className="text-white">
                <Logout />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
