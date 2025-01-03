import type { Metadata } from "next";
import "./globals.css";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "9",
  description: "Day 9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`overflow-hidden ${pacifico.className}`}>
        {children}
      </body>
    </html>
  );
}
