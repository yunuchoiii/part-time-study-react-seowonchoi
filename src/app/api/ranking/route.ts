import { Ranking } from "@/types/rank";
import { NextResponse } from "next/server";

function generateRankingData(count: number): Ranking[] {
  let baseTime = Math.floor(Math.random() * 500) + 500; // 1위 시간
  const rankings: Ranking[] = [];

  for (let i = 0; i < count; i++) {
    rankings.push({
      rank: i + 1,
      name: `사용자 ${i + 1}`,
      time: baseTime,
    });

    baseTime -= Math.floor(Math.random() * 5) + 1; // 랜덤 감소 (1~5분)
    if (baseTime < 0) baseTime = 0; // 0 이하 방지
  }

  return rankings;
}

// 전역 변수로 랭킹 데이터 저장
let cachedRankings: Ranking[] | null = null;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const size = parseInt(searchParams.get("size") || "10", 10);

  // 캐시된 데이터가 없을 때만 새로 생성
  if (!cachedRankings) {
    const randomSize = Math.floor(Math.random() * 100 + 100); // 100~200 랜덤 사이즈
    cachedRankings = generateRankingData(randomSize);
  }

  const startIndex = (page - 1) * size;
  const paginatedRankings = cachedRankings.slice(startIndex, startIndex + size);

  return NextResponse.json(paginatedRankings);
}