"use client";
import { getAllUserEvents } from "@/api/eventAPI";
import EventCard from "@/components/eventCard/EventCard";
import SkeletonFallback from "@/components/skeletonFallback/SkeletonFallback";
import { eventInterface } from "@/interfaces/eventInterface";
import { userInterface } from "@/interfaces/userInterface";
import { selectCurrentUser } from "@/store/authSlice";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

const UpdateEventSelection = () => {
  const CARDS_AT_SCREEN = 10;

  const user = useSelector(selectCurrentUser);

  let totalEvents = 0;
  const [currPage, setCurrPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);
  const [currUser, setCurrUser] = useState<userInterface>({
    name: "Rohan Kaushik",
    id: "1",
    role: "user",
    email: "user@user.com",
  });

  useEffect(() => {
    if (user && user !== null) {
      setCurrUser(user);
    }
  }, [user]);

  const [userEvents, setAllUserEvents] = useState<eventInterface[]>([]);

  const fetchUserEvents = useCallback(async (id: string) => {
    const events = await getAllUserEvents(id);
    if (events && events.length > 0) {
      setPages(Math.ceil(events.length / CARDS_AT_SCREEN));
      setAllUserEvents(events);
    }
  }, []);

  if (userEvents.length > 0) {
    totalEvents = userEvents.length;
  }

  console.log("Total Events -> ", totalEvents);

  useEffect(() => {
    fetchUserEvents(currUser.id);
  }, [currUser, fetchUserEvents]);

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

  return (
    <div className="h-full mt-[11px] relative backdrop-blur-sm">
      <h1 className="font-newsReader pt-22 text-7xl text-center text-amber-50 mb-4">
        Select Event to update 🤺
      </h1>
      <div className="flex my-auto h-fit backdrop-blur-xs! rounded-lg border-0 px-8 pt-2 bg-stone-500/10">
        <div className="eventContainer border-none p-0">
          <div className="pagebar glassEffect border-0 rounded-t-md">
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
          <ul className="glassEffect bg-black/40 border-0 rounded-md rounded-tl-none">
            {userEvents && userEvents.length > 1
              ? userEvents
                  .slice(
                    (currPage - 1) * CARDS_AT_SCREEN,
                    currPage * CARDS_AT_SCREEN
                  )
                  .map((event: eventInterface, index) => (
                    <Link key={index} href={`/events/update/${event.id}`}>
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
                    </Link>
                  ))
              : Array(10)
                  .fill(null)
                  .map((_, index) => <SkeletonFallback key={index} />)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpdateEventSelection;
