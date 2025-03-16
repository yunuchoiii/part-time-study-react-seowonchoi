"use client";

import Slider from "@/components/Slider";
import { formatSecondsToHours } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MONEY_INCREMENT = 500; // 1분마다 증가할 금액
const VIDEO_INCREMENT = 1; // 1분마다 증가할 영상 개수
const TIMER_KEY = "studywork-timer";

export default function Timer() {
  const router = useRouter();
  const cardClass = "py-6 bg-white rounded-2xl shadow-custom-1 flex items-center justify-center";

  const [studyData, setStudyData] = useState({
    seconds: 0,
    money: 0,
    videos: 0,
    startTime: null as number | null,
  });

  useEffect(() => {
    const savedData = localStorage.getItem(TIMER_KEY);

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      setStudyData({
        ...parsedData,
        seconds: parsedData.seconds,
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStudyData((prev) => {
        // 1초마다 시간 증가
        const newSeconds = prev.seconds + 1;

        // 1분마다 금액, 영상 개수 증가
        const newMoney = newSeconds % 60 === 0 ? prev.money + MONEY_INCREMENT : prev.money;
        const newVideos = newSeconds % 60 === 0 ? prev.videos + VIDEO_INCREMENT : prev.videos;

        const updatedData = {
          seconds: newSeconds,
          money: newMoney,
          videos: newVideos,
          startTime: Math.floor(Date.now() / 1000),
        };

        localStorage.setItem(TIMER_KEY, JSON.stringify(updatedData));

        return updatedData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header className="h-10 sticky top-0 left-0 right-0 z-10 flex items-center justify-center bg-white">
        <button
          title="뒤로가기"
          aria-label="뒤로가기"
          className="w-8 h-8 absolute top-1/2 left-0 -translate-y-1/2 flex items-center justify-center"
          onClick={() => router.back()}
        >
          <Image src="/images/arrow-right.png" alt="arrow-left" width={10} height={16} className="rotate-180" />
        </button>
        <h1 className="font-medium">공부 타이머</h1>
      </header>
      <main className="pt-20">
      <Slider />
        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className={`${cardClass} col-span-2 gap-x-8 px-8`}>
            <div className="w-16 h-16 bg-lightPurple rounded-full flex items-center justify-center">
              <Image src="/images/icon_pencil.png" alt="timer" width={50} height={50} />
            </div>
            <div className="flex flex-col gap-y-2 flex-1">
              <span className="text-lightGray">오늘 공부 시간</span>
              <span className="text-[28px] font-bold">{formatSecondsToHours(studyData.seconds)}</span>
            </div>
          </div>
          <div className={`${cardClass} gap-y-2 flex-col`}>
            <p className="text-lightGray">보유 공부 상금</p>
            <div className="flex items-center gap-x-2">
              <Image src="/images/icon_coin.png" alt="money" width={32} height={32} />
              <span className="text-lg font-bold underline underline-offset-4">{studyData.money}원</span>
            </div>
          </div>
          <div className={`${cardClass} gap-y-2 flex-col`}>
            <p className="text-lightGray">오늘 공부 영상</p>
            <div className="flex items-center gap-x-2">
              <Image src="/images/icon_cam.png" alt="video" width={32} height={32} />
              <span className="text-lg font-bold underline underline-offset-4">{studyData.videos}개</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
