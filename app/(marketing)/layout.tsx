import React from "react";
import Navbar from "./_components/navbar";

type Props = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: Props) {
  return (
    <>
      <div className="h-full dark:bg-[#1F1F1F]">
        <Navbar />

        <main className="h-fuuull pt-40">
          {children}
        </main>
      </div>
    </>
  )
}