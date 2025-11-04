"use client";
import { getAllUserEvents } from "@/api/eventAPI";
import { eventInterface } from "@/interfaces/eventInterface";
import { userInterface } from "@/interfaces/userInterface";
import { selectCurrentUser } from "@/store/authSlice";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventCard from "../eventCard/EventCard";
import SkeletonFallback from "../skeletonFallback/SkeletonFallback";

const AllUserEvents = () => {
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

  return (
    <>
      {allUserEvents && allUserEvents.length > 1
        ? allUserEvents.map((event: eventInterface, index) => (
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
    </>
  );
};

export default AllUserEvents;
