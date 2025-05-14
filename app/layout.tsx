import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Appbar from "../components/Appbar";
import { CivicProviderWrapper } from "@/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "blog3",
  description: "blog3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-mono max-w-7xl mx-auto`}
      >
        <CivicProviderWrapper>
          <Appbar />
          {children}
        </CivicProviderWrapper>
      </body>
    </html>
  );
}
