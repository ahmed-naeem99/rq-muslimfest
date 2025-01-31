import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { NextAuthProvider } from "./components/NextAuthProvider";

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
          className={
            "${inter.className} dark:bg-dark h-full flex flex-col transition-colors"
          }
        >
          <NavBar />
          <div className="flex-1 overflow-auto"> {children} </div>
        </body>
      </html>
    </NextAuthProvider>
  );
}
