"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface SliderProps {
  slides: React.ReactNode[];
  interval?: number;
}

export default function Slider({ slides, interval = 5000 }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserScrolling = useRef<boolean>(false);

  const startAutoSlide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!isUserScrolling.current) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
      startAutoSlide();
    }, interval);
  }, [interval, slides.length]);

  const updateCurrentIndex = useCallback(() => {
    if (!sliderRef.current) return;
    const scrollLeft = sliderRef.current.scrollLeft;
    const slideWidth = sliderRef.current.clientWidth;
    const newIndex = Math.round(scrollLeft / slideWidth);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      startAutoSlide();
    }
  }, [currentIndex, startAutoSlide]);

  const handleScroll = useCallback(() => {
    isUserScrolling.current = true;
    requestAnimationFrame(updateCurrentIndex);
    setTimeout(() => {
      isUserScrolling.current = false;
    }, 300);
  }, [updateCurrentIndex]);

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
        {slides.map((slide) => slide)}
      </div>
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-10 flex gap-1">
        {slides.map((_, index) => (
          <div key={index} className={`w-5 h-[3px] transition-all duration-200 ${index === currentIndex ? "bg-white" : "bg-white/50"}`}></div>
        ))}
      </div>
    </div>
  );
}