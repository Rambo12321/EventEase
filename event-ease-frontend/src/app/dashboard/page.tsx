"use client";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/authSlice";
import { getAllGlobalEvents, getAllUserEvents } from "@/api/eventAPI";
import EventCard from "@/components/eventCard/EventCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { eventInterface } from "@/interfaces/eventInterface";
import SkeletonFallback from "@/components/skeletonFallback/SkeletonFallback";

import useAutoHorizontalScroll from "@/hooks/scrolling/useAutoHorizontalScroll";
import { useRouter } from "next/navigation";

const DashBoardPage = () => {
  let cardsOnScreen: number = 1;

  const WIDTH_ONE_CARD = 191.99 + 48;

  const router = useRouter();

  console.log("Width of Single card -> ", WIDTH_ONE_CARD);

  const user = useSelector(selectCurrentUser) || {
    name: "Rohan Kaushik",
    id: "1",
  };

  console.log("User selected to target info -> ", user);

  const [userEvents, setUserEvents] = useState<eventInterface[]>([]);
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

  console.log("Captured user Events -> ", userEvents);

  useEffect(() => {
    fetchUserEvents();
    const interval = setInterval(fetchUserEvents, 1000000);
    return () => clearInterval(interval);
  }, [fetchUserEvents]);

  const userEventRef = useRef<HTMLDivElement | null>(null);

  if (userEventRef.current) {
    cardsOnScreen =
      Math.floor(userEventRef.current.clientWidth / WIDTH_ONE_CARD) + 1;
    console.log("Cards on Screen added -> ", cardsOnScreen);
  }

  const widthExtraSection = cardsOnScreen * WIDTH_ONE_CARD;
  console.log("Width of Exra Section added -> ", widthExtraSection);

  if (userEventRef.current) {
    userEventRef.current.style.scrollBehavior = "auto";
    userEventRef.current.scrollLeft = widthExtraSection;
    userEventRef.current.style.scrollBehavior = "smooth";
  }
  useAutoHorizontalScroll(
    userEventRef,
    userEvents,
    0.5,
    "right",
    widthExtraSection,
    cardsOnScreen
  );

  const [globalEvents, setGlobalEvents] = useState<eventInterface[]>([]);
  const [globalEventLoading, setGlobalEventLoading] = useState<boolean>(true);
  const globalEventRef = useRef<HTMLDivElement | null>(null);

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

  if (globalEventRef.current) {
    const container = globalEventRef.current;
    container.style.scrollBehavior = "auto";
    container.scrollLeft =
      widthExtraSection + 10 * (191.99 + 48) - cardsOnScreen * (191.99 + 48);
    container.style.scrollBehavior = "smooth";
  }

  useAutoHorizontalScroll(
    globalEventRef,
    globalEvents,
    0.5,
    "left",
    widthExtraSection,
    cardsOnScreen
  );

  return (
    <div className="h-full bg-[url('/background.svg')] bg-cover bg-center -mt-17 overflow-x-hidden">
      <div className="w-full text-center pt-10">
        <div className="text-8xl text-amber-700 pt-9 font-shadows font-bold animate-reveal mb-8">
          Hello {user?.name.split(" ")[0]},
        </div>

        <div className="flex pl-10 text-4xl text-yellow-500 font-bold underline ml-8">
          Your Events
        </div>
        <div
          ref={userEventRef}
          className="cardContainer glassEffect bg-white/20"
        >
          {userEventLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => <SkeletonFallback key={index} />)
            : userEvents && userEvents.length > 1
            ? [
                ...userEvents.slice(10 - cardsOnScreen, 10),
                ...userEvents.slice(0, 10),
                ...userEvents.slice(0, cardsOnScreen),
              ].map(({ title, bannerImage, location, date, type }, index) => (
                <EventCard
                  key={index}
                  title={title}
                  location={location}
                  date={date}
                  type={type}
                  bannerImage={bannerImage}
                />
              ))
            : "No data found"}
        </div>

        <div className="flex pr-10 mb-8 mt-2">
          <button
            onClick={() => {
              router.push("/events");
            }}
            className="allEventButton"
          >
            Click to see all User Events
          </button>
        </div>

        <div className="flex pl-10 text-4xl text-blue-300 font-bold underline ml-8">
          Global Events
        </div>
        <div
          ref={globalEventRef}
          className="cardContainer glassEffect bg-white/20"
        >
          {globalEventLoading
            ? Array(5)
                .fill(null)
                .map((_, index) => <SkeletonFallback key={index} />)
            : globalEvents && globalEvents.length > 1
            ? [
                ...globalEvents.slice(10 - cardsOnScreen, 10),
                ...globalEvents.slice(0, 10),
                ...globalEvents.slice(0, cardsOnScreen),
              ].map(({ title, bannerImage, location, date, type }, index) => (
                <EventCard
                  key={index}
                  title={title}
                  bannerImage={bannerImage}
                  location={location}
                  date={date}
                  type={type}
                />
              ))
            : "No Global Events found"}
        </div>
        <div className="flex pr-10 mb-8 mt-2">
          <button
            onClick={() => {
              router.push("/events");
            }}
            className="allEventButton"
          >
            Click to see all Global Events
          </button>
        </div>
        <footer>Contact me and Email and other site links</footer>
      </div>
    </div>
  );
};

export default DashBoardPage;
