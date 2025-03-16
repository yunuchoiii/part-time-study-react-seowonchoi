"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  { id: 1, color: "#E55549" },
  { id: 2, color: "#FF9900" },
  { id: 3, color: "#FFEE00" },
  { id: 4, color: "#1BC139" },
  { id: 5, color: "#499FE5" },
  { id: 6, color: "#494EE5" },
  { id: 7, color: "#972CE3" },
];

const INTERVAL = 5000; // 5초마다 자동 슬라이드

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrolling = useRef(false); // 사용자가 스크롤 중인지 감지

  const startAutoSlide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!isUserScrolling.current) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
      startAutoSlide();
    }, INTERVAL);
  }, []);

  // 스크롤 감지하여 현재 보이는 슬라이드 currentIndex로 설정
  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    isUserScrolling.current = true;

    requestAnimationFrame(() => {
      const scrollLeft = sliderRef.current!.scrollLeft;
      const slideWidth = sliderRef.current!.clientWidth;
      const newIndex = Math.round(scrollLeft / slideWidth);

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        startAutoSlide();
      }

      setTimeout(() => {
        isUserScrolling.current = false;
      }, 300); // 스크롤 멈추면 자동 슬라이드 재개
    });
  }, [currentIndex, startAutoSlide]);

  // currentIndex 변경될 때 자동 스크롤
  useEffect(() => {
    if (sliderRef.current && !isUserScrolling.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.clientWidth * currentIndex,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [startAutoSlide]);

  return (
    <div className="relative w-full h-[100px] overflow-hidden rounded-2xl">
      <div
        ref={sliderRef}
        className="relative flex overflow-x-auto scroll-smooth snap-x snap-mandatory w-full h-full scrollbar-hidden"
        onScroll={handleScroll}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 flex items-center justify-center text-white text-lg font-bold snap-start"
            style={{ backgroundColor: slide.color }}
          >
          </div>
        ))}
      </div>
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10 flex gap-1">
        {slides.map((slide) => (
          <div key={slide.id} className={`w-5 h-[3px] transition-all duration-200 ${slide.id-1 === currentIndex ? "bg-white" : "bg-white/50"}`}></div>
        ))}
      </div>
    </div>
  );
}