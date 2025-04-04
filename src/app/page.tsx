"use client";

import HomeButton from "./components/HomeButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="relative min-h-screen dark:bg-black bg-sky-100 overflow-hidden transition-colors">
      <motion.div
        className="absolute dark:hidden -inset-[100px] opacity-30 blur-[100px]"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 80%, #93c5fd 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 20% 80%, #93c5fd 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 70% 30%, #93c5fd 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 80% 80%, #93c5fd 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      <motion.div
        className="hidden dark:absolute -inset-[100px] opacity-30 blur-[100px]"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 80% 80%, #0f172a 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 20% 80%, #0f172a 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 70% 30%, #0f172a 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 80% 80%, #0f172a 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute dark:inline hidden -inset-[100px] opacity-30 blur-[120px]"
        animate={{
          background: [
            "radial-gradient(circle at 70% 30%, #4c1d95 0%, transparent 50%), radial-gradient(circle at 30% 70%, #134e4a 0%, transparent 50%)",
            "radial-gradient(circle at 30% 30%, #4c1d95 0%, transparent 50%), radial-gradient(circle at 70% 70%, #134e4a 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, #4c1d95 0%, transparent 50%), radial-gradient(circle at 50% 80%, #134e4a 0%, transparent 50%)",
            "radial-gradient(circle at 70% 30%, #4c1d95 0%, transparent 50%), radial-gradient(circle at 30% 70%, #134e4a 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute -inset-[100px] opacity-20 blur-[150px]"
        animate={{
          background: [
            "radial-gradient(circle at 30% 40%, #075985 0%, transparent 40%), radial-gradient(circle at 60% 60%, #1e1e1e 0%, transparent 40%)",
            "radial-gradient(circle at 60% 30%, #075985 0%, transparent 40%), radial-gradient(circle at 30% 70%, #1e1e1e 0%, transparent 40%)",
            "radial-gradient(circle at 40% 60%, #075985 0%, transparent 40%), radial-gradient(circle at 70% 40%, #1e1e1e 0%, transparent 40%)",
            "radial-gradient(circle at 30% 40%, #075985 0%, transparent 40%), radial-gradient(circle at 60% 60%, #1e1e1e 0%, transparent 40%)",
          ],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      <div className="relative h-[93vh] flex flex-col items-center justify-center px-4 z-10">
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 dark:from-sky-300 to-sky-400 dark:to-white">
              Reality Quest
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-sky-950 dark:text-sky-100 mb-12 max-w-2xl">
            Embark on an adventure that blends the digital and physical worlds
          </p>

          <HomeButton />
        </div>

        <motion.div
          className="absolute bottom-10 transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { duration: 1, delay: 1.5 },
            y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            className="text-sky-900/70 dark:text-white/70"
          >
            <path
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
      {/* Game description section */}
      <div className="relative py-20 px-4 md:px-8  bg-sky-50/80 dark:bg-[#0f0f0f]/80 backdrop-blur-md z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              The Ultimate Scavenger Hunt
            </h2>
            <div className="h-1 w-20 bg-sky-400 dark:bg-sky-600 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Explore",
                description:
                  "Discover hidden clues in both digital and physical environments. Scan QR codes, solve puzzles, and unlock new challenges.",
                icon: (
                  <svg
                    className="w-12 h-12 text-sky-300 dark:text-sky-400 mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                title: "Compete",
                description:
                  "Race against time and other players to complete challenges. Earn points, unlock achievements, and climb the leaderboard.",
                icon: (
                  <svg
                    className="w-12 h-12 text-sky-300 dark:text-sky-400 mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 16V8.00002C21 6.34317 19.6569 5.00002 18 5.00002H6C4.34315 5.00002 3 6.34317 3 8.00002V16C3 17.6569 4.34315 19 6 19H18C19.6569 19 21 17.6569 21 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 8L12 14L21 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
              {
                title: "Connect",
                description:
                  "Team up with friends or make new ones. Collaborate to solve complex puzzles and share the thrill of discovery.",
                icon: (
                  <svg
                    className="w-12 h-12 text-sky-300 dark:text-sky-400 mb-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M16.6438 16.1429C15.6229 14.8404 14.0399 14 12.2 14C10.36 14 8.77707 14.8404 7.75623 16.1429C7.52638 16.717 7.4 17.3438 7.4 18V20M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/80 dark:bg-[#1a1a1a]/60 backdrop-blur-md p-8 min-[768px]:mx-0 mx-8 rounded-xl border-none dark:border border-[#333333]/30"
              >
                <div className="flex flex-col items-center text-center">
                  {item.icon}
                  <h3 className="text-xl font-bold dark:text-white text-gray-800 mb-4">
                    {item.title}
                  </h3>
                  <p className="dark:text-white text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              href="/mission/1"
              className="inline-flex items-center text-sky-600 hover:text-white transition-colors"
            >
              Ready to Start the Hunt?
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-10 h-10 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.8) 0%, rgba(14,165,233,0.4) 70%, rgba(2,132,199,0) 100%)",
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  );
}
