import useTimer from "@/hooks/useTimer";
import { act, renderHook } from "@testing-library/react";

beforeEach(() => {
  localStorage.clear();
  jest.useFakeTimers(); // 가짜 타이머 활성화

  // localStorage 메서드를 Mock으로 감싸기
  jest.spyOn(localStorage.__proto__, "setItem");
  jest.spyOn(localStorage.__proto__, "getItem");
});

afterEach(() => {
  jest.useRealTimers(); // 실제 타이머로 복구
  jest.restoreAllMocks(); // 모든 Mock 함수 원래 상태로 복구
});

describe("useTimer Hook", () => {
  it("초기 상태를 올바르게 설정해야 한다.", () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.seconds).toBe(0);
    expect(result.current.money).toBe(0);
    expect(result.current.videos).toBe(0);
    expect(result.current.startTime).toBeNull();
  });

  it("1초마다 시간이 증가해야 한다.", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      jest.advanceTimersByTime(1000); // 1초 경과
    });

    expect(result.current.seconds).toBe(1);
  });

  it("1분마다 money와 videos가 증가해야 한다.", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      jest.advanceTimersByTime(60000); // 60초(1분) 경과
    });

    expect(result.current.money).toBe(500); // 1분마다 500원 증가
    expect(result.current.videos).toBe(1); // 1분마다 1개 증가
  });

  it("로컬 스토리지에 데이터가 저장되어야 한다.", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    // localStorage Mock 함수가 호출되었는지 확인
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it("기존 저장된 타이머 데이터를 불러와야 한다.", () => {
    // Mock 데이터 미리 저장
    localStorage.setItem(
      "studywork-timer",
      JSON.stringify({ seconds: 30, money: 500, videos: 2, startTime: 1710000000 })
    );

    const { result } = renderHook(() => useTimer());

    expect(result.current.seconds).toBe(30);
    expect(result.current.money).toBe(500);
    expect(result.current.videos).toBe(2);
  });
});