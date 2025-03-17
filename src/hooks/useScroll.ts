import { useCallback, useEffect, useState } from "react";

const useScroll = () => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  const isTop = useCallback(() => window.scrollY === 0, []);

  const isBottom = useCallback(() => {
    return window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500;
  }, []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return { isTop, isBottom, scrollDirection };
};

export default useScroll;