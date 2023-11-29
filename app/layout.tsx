import "./globals.css";
import type { Metadata } from "next";
import { Poppins,Indie_Flower } from "next/font/google";

import ConvexClientProvider from "./ConvexClientProvider";
import Nav from "../components/Nav";

const poppins = Poppins({ subsets: ["latin"], weight: ["200","300","400", "500", "600", "700"],variable: "--font-poppins" });
const indie = Indie_Flower({ subsets: ["latin"], weight: "400",variable: "--font-indie" });

export const metadata: Metadata = {
  title: "Draw It",
  description: "Replicate AI doodle to image conversion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${indie.variable}`} >
        <ConvexClientProvider >
          <div className="min-h-screen bg-secondary">
          <Nav />
          {children}
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}