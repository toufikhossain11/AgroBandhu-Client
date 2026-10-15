import type { Metadata, Viewport } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";

const bengali = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgroBondhu | স্মার্ট কৃষি, সমৃদ্ধ ভবিষ্যৎ",
  description: "আপনার জমি, আপনার হিসাব, আপনার ফসল সব এক অ্যাপে",
};

export const viewport: Viewport = {
  themeColor: "#1b7a46",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={bengali.variable}>
      <body>{children}</body>
    </html>
  );
}