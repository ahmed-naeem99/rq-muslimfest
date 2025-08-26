"use client";

import HomeButton from "./components/HomeButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#1e1e1e] to-black overflow-hidden transition-colors">
      {/* Animated gradient background glow */}
      <motion.div
        className="absolute -inset-[120px] opacity-40 blur-[120px]"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #FFBE2C 0%, transparent 60%), radial-gradient(circle at 80% 80%, white 0%, transparent 60%)",
            "radial-gradient(circle at 70% 30%, white 0%, transparent 60%), radial-gradient(circle at 30% 70%, #FFBE2C 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Hero section */}
      <div className="relative h-[93vh] flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE2C] to-white">
              Reality Quest
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FFBE2C]">
              MuslimFest
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#FFBE2C] dark:text-white mb-12 max-w-2xl mx-auto">
            Embark on an adventure that blends the digital and physical worlds
          </p>

          <HomeButton />
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10"
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
            className="text-[#FFBE2C]/70"
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
      <div className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-[#1e1e1e]/70 to-black/80 backdrop-blur-md z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE2C] to-white mb-4">
              The Ultimate Scavenger Hunt
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#FFBE2C] to-white mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Explore",
                description:
                  "Discover hidden clues in both digital and physical environments. Scan QR codes, solve puzzles, and unlock new challenges.",
              },
              {
                title: "Compete",
                description:
                  "Race against time and other players to complete challenges. Earn points, unlock achievements, and climb the leaderboard.",
              },
              {
                title: "Connect",
                description:
                  "Team up with friends or make new ones. Collaborate to solve complex puzzles and share the thrill of discovery.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-b from-[#FFBE2C]/20 to-black/60 backdrop-blur-md p-8 rounded-xl border border-[#FFBE2C]/30"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 mb-4 bg-gradient-to-tr from-[#FFBE2C] to-white rounded-full flex items-center justify-center shadow-lg" />
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE2C] to-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-white">{item.description}</p>
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
              className="inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r from-[#FFBE2C] to-white hover:opacity-80 transition"
            >
              Ready to Start the Hunt?
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-10 h-10 rounded-full pointer-events-none z-50 mix-blend-screen hidden md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(255,190,44,0.8) 0%, rgba(255,255,255,0.4) 70%, rgba(0,0,0,0) 100%)",
          left: mousePosition.x - 20,
          top: mousePosition.y - 20,
        }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          duration: 1,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  );
}
