import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Shadows_Into_Light } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/components/contextProvider/ContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const shadowsLight = Shadows_Into_Light({
  weight: ["400"],
  variable: "--font-shadowsLight",
  subsets: ["latin"],
});

const newsReader = Newsreader({
  weight: ["400"],
  variable: "--font-newsReader",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Event Ease",
  description: "Never miss your important events with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${shadowsLight.variable} ${newsReader.variable} antialiased`}
      >
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
