import Image from "next/image";
import BgIns from "@/components/svg/bgins";
import Arrow from "@/components/svg/arrow";
import { Handlebars } from "@/components/ui/handlebars";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="flex min-h-[calc(100svh-4.5rem)] flex-col justify-center items-center text-center px-4">
      <div className="absolute -top-24 left-0 w-full h-full">
        <BgIns className="w-full -z-10 invert dark:invert-0" />
      </div>

      <div className="flex h-full flex-col items-center justify-center   ">
        <div className="flex items-center justify-center w-full gap-16">
          <Arrow className="-rotate-65 invert dark:invert-0" />
          <div className="w-full flex flex-col items-center justify-center gap-8">
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <h1 className="font-bold text-7xl text-center">
                Add <span className="underline">subtitles</span> to your
              </h1>
              <div className="flex items-center justify-center w-full gap-4">
                <Handlebars>
                  <span className="text-7xl font-bold">Video</span>
                </Handlebars>
                <h1 className="font-bold text-7xl text-center">in seconds</h1>
              </div>
            </div>
            <Button className="text-xl w-1/4 py-6 rounded-xl">
              Try now <ArrowRight size={24} />
            </Button>
            <h6 className="text-center text-lg text-gray-500">
              Upload your video and get subtitles in any language you want, the
              way you want them.
            </h6>
          </div>
          <Arrow className="rotate-y-180 rotate-65 invert dark:invert-0" />
        </div>
        
      </div>
    </div>
  );
}
