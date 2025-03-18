"use client";

import FloatingButton from "@/components/buttons/FloatingButton";
import CircularLoader from "@/components/loader/CircularLoader";
import QRLoginModal from "@/components/modal/QRLoginModal";
import RankingItem from "@/components/ranking/RankingItem";
import useRanking from "@/hooks/useRanking";
import useScroll from "@/hooks/useScroll";
import { Ranking } from "@/types/rank";
import { formatMinutesToHours } from "@/utils";
import throttle from "lodash/throttle";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Home() {
  const { ranking, loading, getRanking, isEnd } = useRanking();
  const { isAtBottom, isAtTop, scrollToTop } = useScroll();

  // 내 랭킹
  const [myRank, setMyRank] = useState<Ranking | null>(null);

  // QR 로그인 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 초기 랭킹 데이터 가져오기
  useEffect(() => {
    getRanking(true);
  }, []);

  // 내 랭킹 설정 (랜덤 1-10위)
  useEffect(() => {
    if (!myRank && ranking.length > 0) {
      setMyRank(ranking[Math.floor(Math.random() * Math.min(10, ranking.length))]);
    }
  }, [ranking]);

  // 무한 스크롤 이벤트 처리 (500ms 마다 한 번씩 실행)
  useEffect(() => {
    const throttledScroll = throttle(() => {
      if (isAtBottom && !loading && !isEnd) {
        getRanking();
      }
    }, 500);
  
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [loading, getRanking, isEnd]);

  // 배경 색상 설정
  useLayoutEffect(() => {
    document.body.style.backgroundColor = "rgba(249,249,251,1)";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-3">
      <header className={`flex justify-between items-center h-16 px-6 fixed top-0 left-0 right-0 z-10 bg-[rgba(249,249,251,1)] transition-shadow duration-300 ${isAtTop ? "" : "shadow-custom-1"}`}>
        <button onClick={() => scrollToTop()}>
          <h1 className="text-base font-bold">우리 지점 랭킹</h1>
        </button>
        <Link href="/timer" className="flex items-center gap-3 px-2.5 py-1.5 hover:bg-lightPurple rounded-md transition-colors duration-150">
          <div className="text-sm">타이머 보기</div>
          <Image src="/images/arrow-right.png" alt="arrow-right" width={8} height={8} />
        </Link>
      </header>

      <main className="flex flex-col gap-y-3 mt-20">
        {myRank && (
          <section className="flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-custom-2">
            <div className="flex items-center gap-x-2">
              <span>나의 랭킹: <b>{myRank?.rank}등</b></span>
              <div className="flex items-center h-7 px-1.5 text-sm bg-lightPurple text-purple rounded-md">
                +2 상승
              </div>
            </div>
            <span className="text-sm font-bold">{formatMinutesToHours(myRank.time)}</span>
          </section>
        )}

        <section>
          <ul className="space-y-3">
            {ranking.map((item) => (
              <RankingItem key={item.rank} item={item} isMyRank={myRank?.rank === item.rank} />
            ))}
          </ul>
        </section>

        {loading && !isEnd && <CircularLoader/>}

        {isEnd && (
          <p className="text-center text-sm text-gray-500 mt-5">
            결과의 마지막입니다.
          </p>
        )}

        <FloatingButton 
          icon={<Image src="/images/icon_qr.png" alt="qr-code" width={24} height={24} />}
          title="QR 로그인"
          onClick={() => setIsModalOpen(true)} 
        />

        <QRLoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
      </main>
    </div>
  );
}
