"use client";
import StepIndicator from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import VideoUploadInput from "@/components/VideoUploadInput";
import React from "react";

const steps = [
  { title: "Step 1", description: "Step 1", number: 1 },
  { title: "Step 2", description: "Step 2", number: 2 },
  { title: "Step 3", description: "Step 3", number: 3 },
];
export default function Page() {
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [step, setStep] = React.useState<number>(1);

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("video", file);
    setStep(2);
    return;

    const response = await fetch("/api/upload-video", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Yükleme başarısız");
    }

    const data = await response.json();
    console.log("Video yüklendi:", data);
  };
  return (
    <div className="h-full  mt-16  flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-3xl">
        <StepIndicator steps={steps} currentStep={step} />
        <div className="gap-4 max-w-3xl h-full w-full items-center justify-center flex flex-col">
          {step === 1 && (
            <VideoUploadInput
              onVideoSelect={(file) => setVideoFile(file)}
              onUpload={handleUpload}
              maxSize={500} // 500 MB
            />
          )}
          {step === 2 && <div>step 2</div>}
          {step === 3 && <div>step 3</div>}
          <div className="flex flex-row w-full justify-between items-center">
            <Button
              className="px-6"
              variant={"secondary"}
              disabled={step == 1}
              onClick={() => setStep((pre) => pre - 1)}
            >
              Prev
            </Button>
            <Button
              className="px-6"
              variant={"secondary"}
              disabled={step == 3}
              onClick={() => setStep((pre) => pre + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
