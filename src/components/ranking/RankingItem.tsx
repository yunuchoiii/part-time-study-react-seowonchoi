import { Ranking } from "@/types/rank";
import { formatMinutesToHours } from "@/utils";
import Image from "next/image";

interface RankingItemProps {
  item: Ranking;
  isMyRank?: boolean;
}

export default function RankingItem({ item, isMyRank = false }: RankingItemProps) {
  const { rank, name, time } = item;

  return (
    <li className={`h-16 bg-white pl-7 pr-4 rounded-xl flex justify-between items-center ${isMyRank ? "border border-purple shadow-custom-purple" : "shadow-custom-2"}`}>
      <div className="flex items-center gap-5">
        <div className="w-7 h-10 relative flex items-center justify-center">
          {rank > 3 ? (
            <span className="font-bold">{rank}</span>
          ) : (
            <Image 
              src={`/images/img_${rank}.png`} 
              alt={`rank-${rank}`} 
              fill 
              sizes="100%" 
              className="object-contain" 
            />
          )}
        </div>
        <div className="flex items-center gap-x-2">
          <span className="font-bold">{name}</span>
          {isMyRank && <div className="flex items-center h-7 px-1.5 text-sm bg-lightPurple text-purple rounded-md">나의 순위</div>}
        </div>
      </div>
      <span className="text-sm text-[rgba(80,80,80,pgl1)]">{formatMinutesToHours(time)}</span>
    </li>
  );
}
