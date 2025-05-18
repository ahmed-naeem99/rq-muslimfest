import React from "react";
import Link from "next/link";
import { TbWorld } from "react-icons/tb";
import { FaInstagram } from "react-icons/fa";
import { IoMailUnreadOutline } from "react-icons/io5";

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 dark:text-white text-dark max-w-4xl h-[70vh] flex items-center justify-center">
      <div className="w-full sm:w-[80%] bg-white dark:bg-neutral-900 shadow-md rounded-lg p-6 md:p-10 outline outline-2 dark:outline-blue-900/50 outline-blue-700/60">
        <h1 className="text-3xl font-bold mb-6 text-center">{`Contact Us`}</h1>

        <div className="border-b border-neutral-500 w-[90%] mx-auto mb-6" />
        <ul className="space-y-1 px-4 py-2">
          <li className="flex justify-center items-center gap-8">
            <TbWorld size={28} />

            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[60%] sm:w-[30%] px-4 py-2 text-center bg-gray-200 dark:bg-neutral-800 hover:bg-red-800/30 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
              href="https://escapearena.ca/"
            >
              Website
            </Link>
          </li>
          <li className="flex justify-center items-center gap-8">
            <FaInstagram size={28} />

            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[60%] sm:w-[30%] px-4 py-2 text-center bg-gray-200 dark:bg-neutral-800 hover:bg-red-800/30 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
              href="https://www.instagram.com/escapearena1/"
            >
              Instagram
            </Link>
          </li>
          <li className="flex justify-center items-center gap-8">
            <IoMailUnreadOutline size={28} />

            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[60%] sm:w-[30%] px-4 py-2 text-center bg-gray-200 dark:bg-neutral-800 hover:bg-red-800/30 dark:hover:bg-red-900/20 rounded-md transition-colors font-medium"
              href="https://escapearena.ca/pages/contact"
            >
              Message Us
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
