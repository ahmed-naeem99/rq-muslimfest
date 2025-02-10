import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import { NextAuthProvider } from "./components/NextAuthProvider";

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
        <body className="dark:bg-dark h-full w-full flex flex-col transition-colors">
          <NavBar />
          <div className="flex-1 overflow-auto"> {children} </div>
        </body>
      </html>
    </NextAuthProvider>
  );
}
