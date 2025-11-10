"use client";

import { useRouter } from "next/navigation";
import { Boxes } from "@/components/magicUI/BoxesBg";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  return (
    <div className="relative h-screen flex overflow-hidden flex-col justify-center items-center gap-8 pb-7">
      <Boxes className="scale-48" />
      <h1 className="relative z-10 font-bold text-6xl text-amber-500">
        Welcome to Event Ease
      </h1>
      <p className="relative z-10 font-bold text-3xl">
        Click here to travel to Application!
      </p>
      <button className=" relative z-10 mainButton" onClick={handleClick}>
        <div>
          <span>Click !</span>
        </div>
      </button>
    </div>
  );
}
