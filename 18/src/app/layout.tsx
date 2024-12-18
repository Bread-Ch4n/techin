import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "18",
  description: "Day 18",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`overflow-hidden ${notoSans.className}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
