import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MAC Reality Quest",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className="h-screen">
      <body
        className={
          "${inter.className} dark:bg-dark h-full flex flex-col transition-colors"
        }
      >
        <NavBar />
        <div className="flex-1"> {children} </div>
      </body>
    </html>
  );
}
