"use client";

import { eventInterface } from "@/interfaces/eventInterface";
import React, { useEffect } from "react";

const useAutoHorizontalScroll = (
  ref: React.RefObject<HTMLDivElement | null>,
  deps: eventInterface[] = [],
  speed: number,
  direction: "right" | "left" = "right",
  extraSection: number,
  cardsOnScreen: number
) => {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const oneCard = 191.99 + 48;

    let rafId: number;
    let paused = false;

    const scroll = async () => {
      if (paused) {
        rafId = requestAnimationFrame(scroll);
        return;
      }

      container.scrollLeft += direction === "right" ? speed : -speed;

      handleScroll(direction);

      rafId = requestAnimationFrame(scroll);
    };

    const handleScroll = (direct: "right" | "left") => {
      if (
        direct == "right" &&
        container.scrollLeft >= container.scrollWidth - 2 * extraSection - 40
      ) {
        container.style.scrollBehavior = "auto";

        container.scrollLeft =
          container.scrollLeft -
          (container.scrollWidth - 2 * extraSection - 48);

        container.style.scrollBehavior = "smooth";
      } else if (direct == "left" && container.scrollLeft <= extraSection) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft =
          extraSection + 10 * oneCard - cardsOnScreen * oneCard;
        container.style.scrollBehavior = "smooth";
      }
      console.debug("Scroll triggered in direction -> ", direction);
    };

    const pause = () => (paused = true);
    const resume = () => (paused = false);

    const scrollHelper = () => {
      if (container.scrollLeft >= extraSection + 10 * oneCard) {
        handleScroll("right");
      } else if (container.scrollLeft < 1) {
        handleScroll("left");
      }
    };
    console.debug("Debugger");
    container.addEventListener("mouseenter", pause);
    container.addEventListener("mouseleave", resume);

    container.addEventListener("scroll", scrollHelper, {
      passive: true,
    });

    rafId = requestAnimationFrame(scroll);

    return () => {
      container.removeEventListener("mouseenter", pause);
      container.removeEventListener("mouseleave", resume);
      cancelAnimationFrame(rafId);
    };
  }, [deps, speed, ref, direction, extraSection, cardsOnScreen]);
};

export default useAutoHorizontalScroll;
