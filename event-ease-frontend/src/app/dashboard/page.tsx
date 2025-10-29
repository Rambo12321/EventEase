"use client";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/authSlice";
import Navbar from "@/components/navbar/Navbar";
import { getAllGlobalEvents, getAllUserEvents } from "@/api/eventAPI";
import EventCard from "@/components/eventCard/EventCard";
import { useCallback, useEffect, useState } from "react";
import { eventInterface } from "@/interfaces/eventInterface";
import SkeletonFallback from "@/components/skeletonFallback/SkeletonFallback";

const DashBoardPage = () => {
  const user = useSelector(selectCurrentUser) || {
    name: "Rohan Kaushik",
    id: "1",
  };

  const [userEvents, setUserEvents] = useState<eventInterface[] | null>(null);
  const [userEventLoading, setUserEventLoading] = useState<boolean>(true);

  const fetchUserEvents = useCallback(async () => {
    const capturedEvents = await getAllUserEvents(user.id);
    if (capturedEvents && capturedEvents.length > 0) {
      setUserEventLoading(false);
    }
    setTimeout(() => {
      setUserEventLoading(false);
    }, 4000);
    setUserEvents(capturedEvents);
  }, [user.id]);

  useEffect(() => {
    fetchUserEvents();
    const interval = setInterval(fetchUserEvents, 1000000);
    return () => clearInterval(interval);
  }, [fetchUserEvents]);

  console.log("Captured user Events -> ", userEvents);

  const [globalEvents, setGlobalEvents] = useState<eventInterface[] | null>(
    null
  );
  const [globalEventLoading, setGlobalEventLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGlobalEvents = async () => {
      const capturedEvents = await getAllGlobalEvents();
      if (capturedEvents && capturedEvents.length > 0) {
        setGlobalEventLoading(false);
      }
      setTimeout(() => {
        setGlobalEventLoading(false);
      }, 4000);
      console.log("Global Events Found -> ", capturedEvents);
      setGlobalEvents(capturedEvents);
    };
    fetchGlobalEvents();
    const interval = setInterval(fetchGlobalEvents, 1000000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full bg-[url('/background.svg')] bg-cover bg-center">
      <Navbar />
      <div className="w-full m-auto text-center">
        <div className="text-8xl text-amber-700 pt-9 font-shadows font-bold animate-reveal mb-8">
          Hello {user?.name.split(" ")[0]},
        </div>

        <div>User Events</div>
        <div className="flex justify-start border-2 gap-12 pl-12 pr-12 border-amber-300 pt-4 pb-4 overflow-x-scroll scrollbar-hide scroll-smooth">
          {userEventLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => <SkeletonFallback key={index} />)
            : userEvents && userEvents.length > 1
            ? userEvents
                .slice(0, 10)
                .map(({ id, title, bannerImage, location, date, type }) => (
                  <EventCard
                    key={id}
                    title={title}
                    location={location}
                    date={date}
                    type={type}
                    bannerImage={bannerImage}
                  />
                ))
            : "No data found"}
        </div>

        <div>Global Events</div>
        <div className="flex justify-start border-2 gap-12 pl-12 pr-12 border-amber-300 pt-4 pb-4">
          {globalEventLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => <SkeletonFallback key={index} />)
            : globalEvents && globalEvents.length > 1
            ? globalEvents
                .slice(0, 5)
                .map(({ id, title, bannerImage, location, date, type }) => (
                  <EventCard
                    key={id}
                    title={title}
                    bannerImage={bannerImage}
                    location={location}
                    date={date}
                    type={type}
                  />
                ))
            : "No Global Events found"}
        </div>
        <footer>Contact me and Email and other site links</footer>
      </div>
    </div>
  );
};

export default DashBoardPage;
