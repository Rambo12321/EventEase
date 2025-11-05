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
  const CARDS_AT_SCREEN = 13;

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

  if (user && user !== null) {
    setCurrentUser(user);
  }

  const fetchUserEvents = useCallback(async (id: string) => {
    const events = await getAllUserEvents(id);

    if (events && events.length > 1) {
      setAllUserEvents(events);
    }
    return;
  }, []);

  useEffect(() => {
    fetchUserEvents(currentUser.id);
  }, [fetchUserEvents, currentUser]);

  console.log("userEvents -> ", allUserEvents);
  console.log("userEvents length-> ", allUserEvents.length);

  const numOfPages = Math.ceil(allUserEvents.length / CARDS_AT_SCREEN);

  console.log("Pages Found -> ", numOfPages);

  return (
    <>
      <div className="pt-20">
        <h1 className="font-bold font-shadows text-8xl text-amber-300 text-center">
          All events of user 👇🏻
        </h1>
      </div>
      <EventTypeSwitchButton />
      <div className=" mt-8 p-12 border-4 border-amber-200 border-dashed">
        <ul className="flex gap-x-12 gap-y-8 p-12 glassEffect justify-center flex-wrap list-none">
          {allUserEvents && allUserEvents.length > 1
            ? allUserEvents.slice(0, 13).map((event: eventInterface, index) => (
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

export default EventsPage;
