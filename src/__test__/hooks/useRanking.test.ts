import useRanking from "@/hooks/useRanking";
import { act, renderHook } from "@testing-library/react";

// API 응답을 Mocking (더미 데이터)
const mockRankingData = [
  { rank: 1, name: "사용자 1", time: 100 },
  { rank: 2, name: "사용자 2", time: 90 },
  { rank: 3, name: "사용자 3", time: 80 },
];

// 랭킹 서비스 모킹
jest.mock("@/services/rankingService", () => ({
  fetchRanking: jest.fn(() => Promise.resolve(mockRankingData)),
}));

// useRanking Hook 테스트
describe("useRanking Hook", () => {
  it("초기 랭킹 데이터를 가져와야 한다.", async () => {
    const { result } = renderHook(() => useRanking());

    await act(async () => {
      await result.current.getRanking(true); // 첫 번째 호출
    });

    expect(result.current.ranking).toEqual(mockRankingData);
    expect(result.current.isEnd).toBe(false);
  });

  it("추가 랭킹 데이터를 가져와야 한다.", async () => {
    const { result } = renderHook(() => useRanking());

    await act(async () => {
      await result.current.getRanking(true); // 첫 번째 호출
      await result.current.getRanking(); // 추가 호출
    });

    expect(result.current.ranking.length).toBe(mockRankingData.length * 2);
  });
});