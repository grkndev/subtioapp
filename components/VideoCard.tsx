import Image from "next/image";
import React from "react";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function VideoCard() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-col gap-1 hover:bg-card p-3 rounded-2xl items-start">
          <Image
            src={"/bgVideo.png"}
            width={1920}
            height={1080}
            className="aspect-video w-full rounded-xl"
            alt="video"
          />
          <div className="flex flex-row items-center justify-between w-full">
            <span className="font-bold text-xl">My Video</span>
            <span className="text-zinc-500">0:18</span>
          </div>
          <span className="text-zinc-500">5 mins ago</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
