import { formatSecondsToMinutes } from "@/utils";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QRLoginModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  const [timeLeft, setTimeLeft] = useState(180);
  const [qrValue, setQrValue] = useState("");

  const updateQRCode = () => {
    setTimeLeft(180);
    const randomNumber = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
    setQrValue(`최서원_${randomNumber}`);
  };

  useEffect(() => {
    updateQRCode();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div 
      onClick={onClose}
      className="fixed top-0 left-0 z-50 w-screen h-screen bg-black/80 flex items-center justify-center"
    >
      <section 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[32px] py-8 px-10"
      >
        <div className="flex flex-col items-center justify-between gap-5">
          <h2 className="text-lg font-bold">QR 로그인</h2>
          <div className="relative">
            <QRCodeCanvas value={qrValue} size={258} />
            {timeLeft == 0 && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/90 fade-in">
                <button 
                  title="QR 코드 새로고침"
                  aria-label="QR 코드 새로고침"
                  onClick={updateQRCode}
                  className="w-[72px] h-[72px] bg-white hover:brightness-95 active:brightness-90 rounded-full flex items-center justify-center shadow-[2px_4px_16px_0_rgba(28,28,30,0.1)] hover:rotate-90 transition-transform duration-300"
                >
                  <Image src="/images/icon_refresh.png" alt="qr-expired" width={40} height={40} />
                </button>
              </div>
            )}
          </div>
          <div className="text-sm h-10 flex items-center justify-center">
            {timeLeft > 0 ? (
              <span>인증시간 {formatSecondsToMinutes(timeLeft)}</span>
            ) : (
              <div className="text-center">
                <p>인증시간이 만료되었습니다.</p>
                <p>다시 시도해주세요.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}