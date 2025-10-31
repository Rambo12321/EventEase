"use client";

import { eventInterface } from "@/interfaces/eventInterface";
import React, { useEffect } from "react";

const useAutoHorizontalScroll = (
  ref: React.RefObject<HTMLDivElement | null>,
  deps: eventInterface[] = [],
  speed: number,
  direction: "right" | "left" = "right"
) => {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

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
        container.scrollLeft >= container.scrollWidth / 2 - 24
      ) {
        container.style.scrollBehavior = "auto";
        if (container.scrollLeft > container.scrollWidth / 2) {
          container.scrollLeft =
            container.scrollLeft - container.scrollWidth / 2 + 24;
        } else {
          container.scrollLeft =
            container.scrollLeft - container.scrollWidth / 2;
        }

        container.style.scrollBehavior = "smooth";
      } else if (direction === "left" && container.scrollLeft <= 0) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = container.scrollWidth - container.clientWidth;
        container.style.scrollBehavior = "smooth";
      }
      console.log("Scroll triggered in direction -> ", direction);
    };

    const pause = () => (paused = true);
    const resume = () => (paused = false);

    const scrollHelper = () => {
      if (container.scrollLeft > 200) {
        handleScroll("right");
      } else {
        handleScroll("left");
      }
    };

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
  }, [deps, speed, ref, direction]);
};

export default useAutoHorizontalScroll;
