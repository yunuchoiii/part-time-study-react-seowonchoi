export const fetchRanking = async (page: number, size = 10) => {
  const res = await fetch(`/api/ranking?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("랭킹 데이터를 불러오지 못했습니다.");
  return await res.json();
};