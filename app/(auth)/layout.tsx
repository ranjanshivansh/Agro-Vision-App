import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "../components/common/Header";
import Footer from "../components/Footer";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agro Vision-Smart Farming Advisory Platform",
  description: "Smart Farming Advisory Platform",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="min-h-full flex flex-col">
        {children}
         <Toaster position="top-right" />
        <Footer/>
        </main>
  );
}
