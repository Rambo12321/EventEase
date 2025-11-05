"use client";
import EventTypeSwitchButton from "@/components/eventTypeSwitchButton/EventTypeSwitchButton";

const page = () => {
  return (
    <>
      <div className="pt-20">
        <h1 className="font-bold font-shadows text-8xl text-amber-300 text-center">
          All Global events 👇🏻
        </h1>
      </div>
      <EventTypeSwitchButton />
    </>
  );
};

export default page;
