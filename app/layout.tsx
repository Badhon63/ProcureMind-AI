"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* এখানে এবং বডিতে suppressHydrationWarning দেওয়া হলো ব্রাউজার এক্সটেনশনের এরর এড়াতে */}
      <body className="antialiased" suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
