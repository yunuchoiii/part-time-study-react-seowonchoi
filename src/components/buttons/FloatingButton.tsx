"use client";

import useScroll from "@/hooks/useScroll";
import { useEffect, useRef, useState } from "react";

interface FloatingButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
}

export default function FloatingButton({ onClick, icon, title }: FloatingButtonProps) {
  const { scrollDirection } = useScroll();
  const titleRef = useRef<HTMLSpanElement>(null);
  const [titleWidth, setTitleWidth] = useState(0);

  // ✅ 타이틀의 실제 너비를 측정하여 상태로 저장
  useEffect(() => {
    if (titleRef.current) {
      setTitleWidth(titleRef.current.scrollWidth);
    }
  }, [title]);

  return (
    <button
      title={title}
      aria-label={title}
      onClick={onClick}
      className={`h-14 fixed z-10 bottom-6 bg-white rounded-full border border-purple flex items-center justify-center shadow-lg hover:bg-lightPurple active:scale-95 active:shadow-md transition-all duration-500 ${scrollDirection === "up" ? "w-36 gap-x-2 right-1/2 translate-x-1/2" : "w-14 gap-x-0 right-6"}`}
    >
      <span>
        {icon}
      </span>
      <span
        ref={titleRef}
        className={`overflow-hidden whitespace-nowrap transition-all duration-500 ${scrollDirection === "up" ? "opacity-100" : "opacity-0"}`}
        style={{ maxWidth: scrollDirection === "up" ? `${titleWidth}px` : "0px" }}
      >
        {title}
      </span>
    </button>
  );
}