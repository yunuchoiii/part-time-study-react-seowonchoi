"use client";

import TimerCard from "@/components/cards/TimerCard";
import Slider from "@/components/slider/Slider";
import useScroll from "@/hooks/useScroll";
import useTimer from "@/hooks/useTimer";
import { formatSecondsToHours } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

// 슬라이더 데이터
const slides = [
  { id: 1, color: "#E55549" },
  { id: 2, color: "#FF9900" },
  { id: 3, color: "#FFEE00" },
  { id: 4, color: "#1BC139" },
  { id: 5, color: "#499FE5" },
  { id: 6, color: "#494EE5" },
  { id: 7, color: "#972CE3" },
];

export default function Timer() {
  const router = useRouter();
  const { isAtTop, scrollToTop } = useScroll();
  const studyData = useTimer();

  return (
    <div>
      <header className={`h-16 fixed top-0 left-0 right-0 z-10 flex items-center justify-center bg-white transition-shadow duration-300 ${isAtTop ? "" : "shadow-custom-1"}`}>
        <button
          title="뒤로가기"
          aria-label="뒤로가기"
          className="w-8 h-8 absolute top-1/2 left-4 -translate-y-1/2 flex items-center justify-center"
          onClick={() => router.back()}
        >
          <Image 
            src="/images/arrow-right.png" 
            alt="arrow-left" 
            width={10} 
            height={16} 
            className="rotate-180" 
          />
        </button>
        <button onClick={() => scrollToTop()}>
          <h1 className="font-medium">공부 타이머</h1>
        </button>
      </header>
      <main className="pt-10 mt-16">
        <section aria-labelledby="study-slider">
          <Slider
            slides={slides.map((slide, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 snap-start"
                style={{ backgroundColor: slide.color }}
              >
              </div>
            ))}
          />
        </section>
        <section className="grid grid-cols-2 gap-3 mt-5" aria-labelledby="study-timer">
          <TimerCard 
            title="오늘 공부 시간" 
            icon="/images/icon_pencil.png" 
            value={formatSecondsToHours(studyData.seconds)} 
            isFullWidth
          />
          <TimerCard 
            title="보유 공부 상금" 
            icon="/images/icon_coin.png" 
            value={`${studyData.money}원`} 
          />
          <TimerCard 
            title="오늘 공부 영상" 
            icon="/images/icon_cam.png" 
            value={`${studyData.videos}개`} 
          />
        </section>
      </main>
    </div>
  );
}
