"use client";

import QRModal from "@/components/QRModal";
import RankingItem from "@/components/RankingItem";
import useRanking from "@/hooks/useRanking";
import { formatMinutesToHours } from "@/utils";
import throttle from "lodash/throttle";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { ranking, loading, getRanking, isEnd } = useRanking();

  const myRank = ranking[Math.floor(Math.random() * 10)];

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getRanking(true);
  }, []);

  const handleScroll = useCallback(
    // 1초에 한 번씩 실행되도록 제한
    throttle(() => {
      if (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 &&
        !loading
      ) {
        getRanking();
      }
    }, 1000),
    [loading, getRanking]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleQRCode = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[rgba(249,249,251,1)] pt-10 px-6 pb-28 min-h-screen flex flex-col gap-y-3">
      <header className="flex justify-between items-center py-2.5 sticky top-0 left-6 right-6 bg-[rgba(249,249,251,1)] z-10">
        <h1 className="text-base font-bold">우리 지점 랭킹</h1>
        <Link href="/timer" className="flex items-center gap-3 px-2.5 py-1.5 hover:bg-lightPurple rounded-md transition-colors duration-150">
          <div className="text-sm">타이머 보기</div>
          <Image src="/images/arrow-right.png" alt="arrow-right" width={8} height={8} />
        </Link>
      </header>

      <main className="flex flex-col gap-y-3">
        {myRank && (
          <section className="flex items-center justify-between px-4 py-3 bg-white rounded-xl">
            <div className="flex items-center gap-x-2">
              <span>나의 랭킹: <b>{myRank?.rank}등</b></span>
              <div className="flex items-center h-7 px-1.5 bg-lightPurple text-purple rounded-md">
                +2 상승
              </div>
            </div>
            <span className="text-sm font-bold">{formatMinutesToHours(myRank.time)}</span>
          </section>
        )}

        <section>
          <ul className="space-y-3">
            {ranking.map((item) => (
              <RankingItem key={item.rank} item={item} />
            ))}
          </ul>
        </section>

        {loading && (
          <div className="flex justify-center items-center h-full">
            <div className="w-10 h-10 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        )}

        {isEnd && (
          <p className="text-center text-sm text-gray-500 mt-5">
            결과의 마지막입니다.
          </p>
        )}

        <button 
          title="QR 코드 보기"
          aria-label="QR 코드 보기"
          onClick={handleQRCode} 
          className="w-36 h-14 fixed z-10 bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full border border-purple flex items-center justify-center gap-x-2 shadow-lg hover:bg-lightPurple active:scale-95 active:shadow-md transition-all duration-150"
        >
          <Image src="/images/icon_qr.png" alt="qr-code" width={24} height={24} />
          <span>QR 코드</span>
        </button>

        <QRModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      </main>
    </div>
  );
}
