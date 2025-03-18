import { useCallback, useEffect, useState } from "react";

const useScroll = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  const isAtTop = typeof window !== "undefined" && window.scrollY === 0;
  const isAtBottom = typeof window !== "undefined" && window.innerHeight + window.scrollY >= (document?.documentElement?.scrollHeight ?? 0) - 500;

  const handleScroll = useCallback(() => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    }
  }, [lastScrollY]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { isAtTop, isAtBottom, scrollDirection, scrollToTop };
};

export default useScroll;