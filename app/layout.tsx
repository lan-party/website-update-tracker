import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Website Update Tracker",
  description: "Input a link to webpage and we'll notify you whenever it changes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
      {/* <Script type="text/javascript" data-cmp-ab="1" src="https://cdn.consentmanager.net/delivery/autoblocking/7932ed81724c1.js" data-cmp-host="a.delivery.consentmanager.net" data-cmp-cdn="cdn.consentmanager.net" data-cmp-codesrc="16"></Script> */}

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <GoogleAnalytics gaId="G-6XCCGW5SP3" />
      <GoogleAnalytics gaId="AW-443214391" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-base-300`}
      >
        {children}
        <Toaster />

        <Footer />
      </body>
    </html>
  );
}
