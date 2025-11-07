"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { HeaderBase } from "./header-base";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const leftContent = (
    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/icons/icon_default.svg"
        alt="OpenCut Logo"
        className="dark:invert"
        width={32}
        height={32}
      />
      <span className="text-xl font-medium hidden md:block">Subtio</span>
    </Link>
  );

  const rightContent = (
    <nav className="flex items-center gap-2">
      
      <Link href="/dashboard">
        <Button size="sm" className="text-sm ml-2">
          Login
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
      <ThemeToggle className="mr-2" />
    </nav>
  );

  return (
    <div className="sticky top-4 z-50 mx-4 md:mx-0">
      <HeaderBase
        className="backdrop-blur-lg border rounded-2xl  max-w-3xl mx-auto mt-4 pl-4 pr-[11px]"
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </div>
  );
}