"use client";

import { getAllUserEvents } from "@/api/eventAPI";
import { eventInterface } from "@/interfaces/eventInterface";
import { userInterface } from "@/interfaces/userInterface";
import { selectCurrentUser } from "@/store/authSlice";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "@/components/eventCard/EventCard";
import SkeletonFallback from "@/components/skeletonFallback/SkeletonFallback";
import EventTypeSwitchButton from "@/components/eventTypeSwitchButton/EventTypeSwitchButton";

const EventsPage = () => {
  const CARDS_AT_SCREEN = 10;

  let totalEvents = 0;
  const [currPage, setCurrPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(0);

  const [allUserEvents, setAllUserEvents] = useState<eventInterface[]>([]);
  const [currentUser, setCurrentUser] = useState<userInterface>({
    name: "Rohan Kaushik",
    id: "1",
    role: "user",
    email: "user@user.com",
  });

  const user = useSelector(selectCurrentUser);
  if (user) {
    console.log("Current user -> ", user);
  } else {
    console.log(
      " Currently not logged as any user. Hence default user -> ",
      currentUser
    );
  }

  useEffect(() => {
    if (user && user !== null) {
      setCurrentUser(user);
    }
  }, [setCurrentUser, user]);

  const fetchUserEvents = useCallback(async (id: string) => {
    const events = await getAllUserEvents(id);

    if (events && events.length > 1) {
      setAllUserEvents(events);
      setPages(Math.ceil(events.length / CARDS_AT_SCREEN));
    }
    return;
  }, []);

  if (allUserEvents.length > 0) {
    totalEvents = allUserEvents.length;
  }

  useEffect(() => {
    fetchUserEvents(currentUser.id);
  }, [fetchUserEvents, currentUser]);

  console.log("userEvents -> ", allUserEvents);
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
    <div className="bg-[url('/background.svg')] bg-fixed bg-cover bg-center">
      <div className="pt-20">
        <h1 className="eventHeading">All events of user 👇🏻</h1>
      </div>
      <EventTypeSwitchButton />
      <div className="eventContainer">
        <div className="pagebar glassEffect bg-transparent!">
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
          {allUserEvents && allUserEvents.length > 1
            ? allUserEvents
                .slice(
                  (currPage - 1) * CARDS_AT_SCREEN,
                  currPage * CARDS_AT_SCREEN
                )
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
    </div>
  );
};

export default EventsPage;
