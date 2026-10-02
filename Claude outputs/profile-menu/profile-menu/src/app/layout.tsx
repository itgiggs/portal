import type { Metadata } from "next";

import "./globals.css";
import { SiteHeader } from "./_components/site-header";

const geistSans = { variable: "--font-geist-sans" };

const geistMono = { variable: "--font-geist-mono" };

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Find your next role, or hire for one.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-zinc-100 dark:bg-black">
        <div className="mx-auto flex w-full min-w-[540px] max-w-[540px] flex-1 flex-col bg-white">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}