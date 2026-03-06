import { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EGZOTech",
  description: "EGZOTech platform for trening your health",
  icons: {
    icon: "/logo-icon-white.png",
    shortcut: "/logo-icon-white.png",
    apple: "/logo-icon-white.png",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
