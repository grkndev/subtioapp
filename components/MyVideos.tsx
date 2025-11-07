import React from "react";
import VideoCard from "./VideoCard";
import { Button } from "./ui/button";
import Link from "next/link";

export default function MyVideos() {
  return (
    <div className="px-4 gap-4 flex flex-col">
      <div className="flex flex-row justify-between items-center px-2">
        <h1 className=" font-bold text-2xl">My Videos (4)</h1>
        <Link href={"/dashboard/new"}>
          <Button className="rounded-xl">New Video</Button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
}
