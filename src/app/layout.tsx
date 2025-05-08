import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "./components/navbar/NavBar";
import { NextAuthProvider } from "./components/NextAuthProvider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MAC Reality Quest",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextAuthProvider>
      <html lang="en" className="h-full dark">
        <body
          className={`dark:bg-zinc-800 bg-gray-100/60 h-full w-full flex flex-col transition-colors p-0 ${inter.className}`}
        >
          <div className="sticky top-0 z-50">
            <NavBar />
          </div>
          <div className="relative overflow-auto">{children}</div>
          <Analytics />
        </body>
      </html>
    </NextAuthProvider>
  );
}
