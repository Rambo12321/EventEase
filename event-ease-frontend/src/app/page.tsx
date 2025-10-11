"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/login");
  };
  return (
    <div className="landingBg h-screen flex flex-col justify-center items-center gap-8 pb-7">
      <h1 className="font-bold text-6xl text-black">Welcome to Event Ease</h1>
      <p className="font-bold text-3xl">Click here to travel to Application!</p>
      <button className="mainButton" onClick={handleClick}>
        <div>
          <span>Click !</span>
        </div>
      </button>
    </div>
  );
}
