import { Ranking } from "@/types/rank";
import { formatMinutesToHours } from "@/utils";
import Image from "next/image";

interface RankingItemProps {
  item: Ranking;
}

export default function RankingItem({ item }: RankingItemProps) {
  const { rank, name, time } = item;

  return (
    <li className="bg-white h-16 pl-7 pr-4 rounded-xl flex justify-between items-center">
      <div className="flex items-center gap-5">
        <div className="w-7 h-10 relative flex items-center justify-center">
          {rank > 3 ? (
            <span className="font-bold">{rank}</span>
          ) : (
            <Image src={`/images/img_${rank}.png`} alt={`rank-${rank}`} fill className="object-contain" />
          )}
        </div>
        <span className="font-bold">{name}</span>
      </div>
      <span className="text-sm text-[rgba(80,80,80,pgl1)]">{formatMinutesToHours(time)}</span>
    </li>
  );
}
