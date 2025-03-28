import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { getServerSession } from "next-auth";
import Logout from "./Logout";
import realityQuestLogo from "../../../../public/rqlogo.svg";
import { RxAvatar } from "react-icons/rx";

const NavBar = async () => {
  const session = await getServerSession();
  return (
    <div className="backdrop-blur-lg bg-white dark:bg-black/10  navbar  dark:text-white dark:focus:text-white transition-colors sm:px-6 px-2">
      <div className="navbar-start">
        <Link href="/" className="font-normal">
          <div className="btn btn-ghost btn-square">
            <Image priority src={realityQuestLogo} alt="Logo" width={50} />
          </div>
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal px-1 items-center justify-center flex">
          <li>
            <details>
              <summary>Missions</summary>
              <ul className="p-2  bg-sky-400 dark:bg-sky-600">
                <li>
                  <Link
                    className="dark:focus:text-white text-white"
                    href="/mission/1"
                  >
                    M1
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark:focus:text-white text-white"
                    href="/mission/2"
                  >
                    M2
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark:focus:text-white text-white"
                    href="/mission/3"
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
            <div className="rounded-full">
              <RxAvatar size={25} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className=" mt-24 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52  bg-sky-400 dark:bg-sky-600"
          >
            {!session && (
              <li>
                <Link className="text-white  justify-between" href="/login">
                  Login
                  {/* <span className="badge">New</span> */}
                </Link>
              </li>
            )}
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
