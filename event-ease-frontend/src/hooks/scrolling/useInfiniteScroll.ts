"use client";

import { useEffect } from "react";

const useInfiniteScroll = (
  ref: React.RefObject<HTMLDivElement | null>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: any[] = []
) => {
  useEffect(() => {
    const container = ref.current;

    if (!container) return;

    const updateScroll = () => {
      const scrollWidth = container.scrollWidth / 2;
      const scrollAmount = container.scrollLeft;

      if (scrollAmount >= scrollWidth) {
        container.scrollLeft = scrollAmount - scrollWidth;
      } else if (scrollAmount <= 0) {
        container.scrollLeft = scrollAmount + scrollWidth;
      }
    };

    container.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", updateScroll);
    };
  }, [ref, deps]);
};

export default useInfiniteScroll;
