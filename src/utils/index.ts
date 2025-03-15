/**
 * 분을 시간과 분으로 변환
 * @param time 분
 * @returns 0시간 0분
 */
export const formatMinutesToHours = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const leftMinutes = minutes - hour * 60;
  return `${hour}시간 ${leftMinutes}분`;
};

/**
 * 초를 분과 초로 변환
 * @param seconds 초
 * @returns 00:00
 */
export const formatSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
};
