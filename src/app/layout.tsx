import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "StudyWork 최서원 프론트엔드 과제",
  description: "StudyWork 최서원 프론트엔드 과제입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable}`}>
        {children}
      </body>
    </html>
  );
}
