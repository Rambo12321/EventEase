"use client";
import { getAllGlobalEvents } from "@/api/eventAPI";
import EventCard from "@/components/eventCard/EventCard";
import EventTypeSwitchButton from "@/components/eventTypeSwitchButton/EventTypeSwitchButton";
import SkeletonFallback from "@/components/skeletonFallback/SkeletonFallback";
import { eventInterface } from "@/interfaces/eventInterface";

import { useCallback, useEffect, useState } from "react";

const GlobalPage = () => {
  const CARDS_AT_SCREEN = 13;

  const [totalEvents, setTotalEvents] = useState<number>(0);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [allGlobalEvents, setAllGlobalEvents] = useState<eventInterface[]>([]);

  const fetchGlobalEvents = useCallback(async () => {
    const events = await getAllGlobalEvents();

    if (events && events.length > 1) {
      setAllGlobalEvents(events);
      setTotalEvents(events.length);
      setPages(Math.ceil(events.length / CARDS_AT_SCREEN));
    }
    return;
  }, []);

  useEffect(() => {
    fetchGlobalEvents();
  }, [fetchGlobalEvents]);

  console.log("GlobalEvents -> ", allGlobalEvents);
  console.log("Total Events-> ", totalEvents);
  console.log("Total Pages Found -> ", pages);

  const handleClickForward = () => {
    if (currPage < pages) {
      setCurrPage(currPage + 1);
      console.log("Page moved forward");
    } else {
      console.log("Limit over Button disable here");
    }
    console.log("Clicked on a button", pages);
    return;
  };

  const handleClickBackward = () => {
    if (currPage >= 2) {
      setCurrPage(currPage - 1);
      console.log("Page moved backward");
    } else {
      console.log("Limit over Button disable here");
    }
    console.log("Clicked on a button", pages);
    return;
  };

  return (
    <>
      <div className="pt-20">
        <h1 className="font-bold font-shadows text-8xl text-amber-300 text-center">
          All Global events 👇🏻
        </h1>
      </div>
      <EventTypeSwitchButton />
      <div className=" mt-8 p-12 border-4 border-amber-200 border-dashed">
        <div className="flex glassEffect w-fit justify-center bg-white/10! align-middle">
          <p className="pl-2 self-center text-black font-bold text-xl font-newsReader">
            Switch Page :{" "}
          </p>
          <button
            onClick={handleClickBackward}
            className="text-2xl cursor-customPointer"
          >
            ⬅️
          </button>
          <div className="bg-black/50 rounded-sm px-2 my-1">{currPage}</div>
          <button
            onClick={handleClickForward}
            className="cursor-customPointer text-2xl"
          >
            ➡️
          </button>
        </div>
        <ul className="flex gap-x-12 gap-y-8 p-12 glassEffect justify-center flex-wrap list-none">
          {allGlobalEvents && allGlobalEvents.length > 1
            ? allGlobalEvents
                .slice(0, 13)
                .map((event: eventInterface, index) => (
                  <li key={index} className="">
                    <EventCard
                      key={index}
                      title={event.title}
                      location={event.location}
                      date={event.date}
                      type={event.type}
                      bannerImage={event.bannerImage}
                    />
                  </li>
                ))
            : Array(10)
                .fill(null)
                .map((_, index) => <SkeletonFallback key={index} />)}
        </ul>
      </div>
    </>
  );
};

export default GlobalPage;
