import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProcureMind AI",
  description: "Autonomous Procurement Platform Powered by Agentic AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      {/* 🎯 suppressHydrationWarning যুক্ত করা হয়েছে */}
      <body
        suppressHydrationWarning
        className={`${inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased`}
      >
        <ReactQueryProvider>
          <Navbar />
          <main className="flex-grow pt-16">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
