"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Logout from "./Logout";
import realityQuestLogo from "../../../../public/rqlogo.svg";
import { RxAvatar } from "react-icons/rx";

const NavBar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!detailsRef.current || !isOpen) return;

      const target = event.target as Node;
      if (!detailsRef.current.contains(target)) {
        detailsRef.current.open = false;
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement, Event>) => {
    const details = e.currentTarget;

    setTimeout(() => {
      if (details) {
        const isCurrentlyOpen = details.open;
        setIsOpen(isCurrentlyOpen);
      }
    }, 0);
  };

  const toggleDropdown = () => {
    if (detailsRef.current) {
      const newState = !detailsRef.current.open;
      detailsRef.current.open = newState;
      setIsOpen(newState);
    }
  };

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
            <details ref={detailsRef} onToggle={handleToggle}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  toggleDropdown();
                }}
              >
                Missions
              </summary>
              <ul className="p-2  bg-sky-400 dark:bg-neutral-600">
                <li>
                  <Link
                    className="dark:focus:text-white focus:text-white text-white"
                    href="/mission/1"
                  >
                    M1
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark:focus:text-white focus:text-white text-white"
                    href="/mission/2"
                  >
                    M2
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark:focus:text-white focus:text-white text-white"
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
              className="dark:focus:text-white focus:text-black dark:text-white"
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
            className=" mt-24 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52  bg-sky-400 dark:bg-neutral-600"
          >
            {!session && (
              <li>
                <Link
                  className="dark:focus:text-white focus:text-white text-white  justify-between "
                  href="/login"
                >
                  Login
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
