import { useEffect, useState } from "react";

const TIMER_KEY = "studywork-timer";
const MONEY_INCREMENT = 500;
const VIDEO_INCREMENT = 1;

const useTimer = () => {
  // 공부 데이터 (시간, 금액, 영상 개수, 시작 시간)
  const [studyData, setStudyData] = useState({
    seconds: 0,
    money: 0,
    videos: 0,
    startTime: null as number | null,
  });

  // 공부 데이터 로컬스토리지 -> state 저장
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

        // 공부 데이터 로컬스토리지 저장
        localStorage.setItem(TIMER_KEY, JSON.stringify(updatedData));

        // 공부 데이터 state 업데이트
        return updatedData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return studyData;
};

export default useTimer;