import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 実際にデプロイする、またはデプロイ済みのVercelのURL
const SITE_URL = "https://premium-route-diagnosis.vercel.app"; // ★ここに実際のURLを貼ってください（末尾の / は不要）

export const metadata: Metadata = {
  title: "28卒就活診断｜11/30締切『プレミアルート』あなたの必要度＆危険度は？",
  description: "所要時間1分・全8問！損保ジャパン・オリックス・住友商事GMなど20社が参画する『プレミアルート』。あなたの就活危険度と最適な活用ルートを診断します。",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "28卒就活診断｜11/30締切『プレミアルート』あなたの必要度＆危険度は？",
    description: "所要時間1分・全8問！損保ジャパン・オリックス・住友商事GMなど20社が参画する『プレミアルート』。あなたの就活危険度と最適な活用ルートを診断します。",
    url: SITE_URL,
    siteName: "en-courage 28卒 プレミアルート必要度診断",
    images: [
      {
        url: "/ogp.png", // public/ogp.png を参照します
        width: 1200,
        height: 630,
        alt: "en-courage プレミアルート必要度診断",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "28卒就活診断｜11/30締切『プレミアルート』あなたの必要度＆危険度は？",
    description: "所要時間1分・全8問！損保ジャパン・オリックス・住友商事GMなど20社が参画する『プレミアルート』。あなたの就活危険度と最適な活用ルートを診断します。",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
