"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function GlobalError() {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen max-h-screen overflow-hidden`}
      >
        <h1>Ooops...</h1>
        <p>Something went wrong</p>
        <Button onClick={() => window.location.reload()}>Refresh page</Button>
      </body>
    </html>
  );
}
