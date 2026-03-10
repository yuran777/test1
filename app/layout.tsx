import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1",

  title: "성우 · 유란 결혼합니다",
  description: "2026.7.12 결혼식에 초대합니다.",

  openGraph: {
    title: "성우 · 유란 결혼합니다",
    description: "2026.7.12 결혼식에 초대합니다.",
    url: "https://test1-peach-six.vercel.app/invitation/sample",
    siteName: "Weddinginvi",
    images: [
      {
        url: "https://test1-peach-six.vercel.app/thumnail.jpeg",
        width: 1200,
        height: 630,
        alt: "Wedding Invitation",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "성우 · 유란 결혼합니다",
    description: "2025.11.23 웨딩홀 결혼식에 초대합니다.",
    images: ["https://test1-peach-six.vercel.app/thumnail.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Kakao SDK */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.8.0/kakao.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}