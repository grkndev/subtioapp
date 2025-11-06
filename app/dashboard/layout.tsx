import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full min-h-[calc(100svh-4.5rem)] h-full">
    {children}
  </div>;
}
