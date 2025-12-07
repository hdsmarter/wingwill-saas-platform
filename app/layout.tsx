import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./global.css";

const notoSansTC = Noto_Sans_TC({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-tc',
});

export const metadata: Metadata = {
  title: "WingWill SaaS Platform - 羽昇國際",
  description: "雲端服務訂閱管理平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
