import React from "react"

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <main className="h-full">
      {children}
    </main>
  )
}