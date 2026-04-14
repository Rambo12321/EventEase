import { Boxes } from "@/components/magicUI/BoxesBg";
import ConfettiButton from "@/components/ConfettiButton/ConfettiButton";

export default function Home() {
  return (
    <div className="relative h-screen flex overflow-hidden flex-col justify-center items-center gap-8 pb-7">
      <Boxes className="scale-48" />
      <h1 className="relative z-10 font-bold text-6xl text-amber-500">
        Welcome to Event Ease
      </h1>
      <p className="relative z-10 font-bold text-3xl">
        Click here to travel to Application!
      </p>
      <ConfettiButton
        label="Check out Application !"
        classes="relative z-10 mainButton border-0 bg-blue-600 text-black cursor-customPointer text-2xl font-newsReader font-bold"
        redirect="/login"
        theme="Neon"
      />
    </div>
  );
}
