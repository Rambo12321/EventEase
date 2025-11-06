"use client";
import { getAllGlobalEvents } from "@/api/eventAPI";
import EventCard from "@/components/eventCard/EventCard";
import EventTypeSwitchButton from "@/components/eventTypeSwitchButton/EventTypeSwitchButton";
import SkeletonFallback from "@/components/skeletonFallback/SkeletonFallback";
import { eventInterface } from "@/interfaces/eventInterface";

import { useCallback, useEffect, useState } from "react";

const GlobalPage = () => {
  const CARDS_AT_SCREEN = 13;

  let totalEvents = 0;
  const [currPage, setCurrPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [allGlobalEvents, setAllGlobalEvents] = useState<eventInterface[]>([]);

  const fetchGlobalEvents = useCallback(async () => {
    const events = await getAllGlobalEvents();

    if (events && events.length > 1) {
      setAllGlobalEvents(events);
      setPages(Math.ceil(events.length / CARDS_AT_SCREEN));
    }
    return;
  }, []);

  if (allGlobalEvents.length > 0) {
    totalEvents = allGlobalEvents.length;
  }

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
        <h1 className="eventHeading">All Global events 👇🏻</h1>
      </div>
      <EventTypeSwitchButton />
      <div className="eventContainer">
        <div className="pagebar glassEffect">
          <p>Switch Page : </p>
          <button
            onClick={handleClickBackward}
            disabled={currPage == 1}
            className={currPage > 1 ? "" : "cursor-customNormal!"}
          >
            {currPage > 1 ? "⬅️" : "👎🏻"}
          </button>
          <div>{currPage}</div>
          <button
            disabled={currPage == pages}
            onClick={handleClickForward}
            className={currPage == pages ? "cursor-customNormal!" : ""}
          >
            {currPage == pages ? "👎🏻" : "➡️"}
          </button>
        </div>
        <ul className="glassEffect">
          {allGlobalEvents && allGlobalEvents.length > 1
            ? allGlobalEvents
                .slice((currPage - 1) * 13, currPage * 13)
                .map((event: eventInterface, index) => (
                  <li key={index}>
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
