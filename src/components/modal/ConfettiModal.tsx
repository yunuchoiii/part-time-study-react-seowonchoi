import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  myRank: number;
}

export default function ConfettiModal({ isOpen, onClose, myRank }: ModalProps) {
  if (!isOpen) return null;

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/confetti.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Lottie 파일 로드 실패:", error));
  }, []);

  if (!animationData) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/80 flex items-center justify-center fade-in"
    >
      <section 
        onClick={(e) => e.stopPropagation()}
        className=""
      >
        <div className="relative">
          <Lottie animationData={animationData}/>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <img
              src={`/images/img_${myRank}.png`}
              alt="confetti"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="flex items-center justify-center flex-col text-white gap-y-2 -mt-10">
          <h1 className="text-2xl font-bold">축하드립니다!</h1>
          <p className="text-lg">우리 지점 <strong>{myRank}위</strong>를 달성하였습니다 👍</p>
        </div>
      </section>
    </div>
  )
}