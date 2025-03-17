import { fetchRanking } from "@/services/rankingService";
import { Ranking } from "@/types/rank";
import { useState } from "react";

const useRanking = () => {
  const [ranking, setRanking] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);

  const getRanking = async (first = false) => {
    setLoading(true);

    const newData = await fetchRanking(page);

    // 1페이지(초기 데이터 설정)
    if (first) {
      setRanking(newData);
      setPage(2);
    } else {
      // 2페이지 이후 데이터 추가
      if (newData.length === 0) {
        setIsEnd(true);
      } else {
        setRanking((prev) => [...prev, ...newData]);
        setPage((prev) => prev + 1);
      }
    }

    setLoading(false);
  };

  return {
    ranking,
    loading,
    getRanking,
    isEnd
  };
};

export default useRanking;