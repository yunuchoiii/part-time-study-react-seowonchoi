"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

export default function Loader() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/loader.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Lottie 파일 로드 실패:", error));
  }, []);

  if (!animationData) return null;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}