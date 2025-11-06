import Image from "next/image";
import BgIns from "@/components/svg/bgins";
import Arrow from "@/components/svg/arrow";
import { Handlebars } from "@/components/ui/handlebars";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className=" flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="absolute top-0 left-0 w-screen h-full">
        <Image
          src={"/bglight.png"}
          alt="bglight"
          className="w-full object-fill absolute"
          width={1920}
          height={1080}
        />

        <BgIns className="w-full" />
      </div>

      <main className="flex gap-10 min-h-screen w-full max-w-fit flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black ">
        <div className="flex items-center justify-center w-full gap-16">
          <Arrow className="-rotate-65" />
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
            <Button className="text-2xl w-1/4 py-6">
              Try now <ArrowRight size={24}/>
            </Button>
            <h6 className="text-center text-lg text-gray-500">
              Upload your video and get subtitles in any language you want, the
              way you want them.
            </h6>
          </div>
          <Arrow className="rotate-y-180 rotate-65" />
        </div>
        {/* <div className="  items-center justify-center flex  p-1  bg-gradient-to-tl from-subtio-gold via-transparent via-50% to-subtio-gold rounded-2xl ">
          <Image
            src={"/bgvideo.png"}
            alt="bgvideo"
            width={1920}
            height={1080}
            className=" object-cover h-[40vh] aspect-video w-fit  rounded-xl"
          />
        </div> */}
      </main>
    </div>
  );
}
