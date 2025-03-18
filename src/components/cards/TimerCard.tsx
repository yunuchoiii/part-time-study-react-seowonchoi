import Image from "next/image";

interface TimerCardProps {
  title: string;
  icon: string;
  value: string;
  isFullWidth?: boolean;
}

export default function TimerCard({ title, icon, value, isFullWidth = false }: TimerCardProps) {
  if (isFullWidth) {
    // 전체 너비 카드
    return (
      <article className={`py-6 bg-white rounded-2xl shadow-custom-1 flex items-center justify-center col-span-2 gap-x-8 px-8`}>
        <div className="w-16 h-16 bg-lightPurple rounded-full flex items-center justify-center">
          <Image 
            src={icon} 
            alt={title} 
            width={50} 
            height={50} 
            style={{ width: "50px", height: "50px" }} 
          />
        </div>
        <div className="grid gap-y-2 flex-1">
          <p className="text-lightGray">{title}</p>
          <p className="text-[28px] font-bold">{value}</p>
        </div>
      </article>
    );
  } else {
    // 절반 너비 카드
    return (
      <article className={`py-6 bg-white rounded-2xl shadow-custom-1 flex items-center justify-center gap-y-2 flex-col`}>
        <p className="text-lightGray">{title}</p>
        <div className="flex items-center gap-x-2">
          <Image 
            src={icon} 
            alt={title} 
            width={32} 
            height={32} 
            style={{ width: "32px", height: "32px" }} 
          />
          <span className="text-lg font-bold underline underline-offset-4">{value}</span>
        </div>
      </article>
    );
  }
}