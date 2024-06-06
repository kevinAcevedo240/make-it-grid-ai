import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MakeItGrid AI | Bento Grid Creation Platform with AI",
  description: "Empower your creativity with MakeItGrid, the ultimate platform for crafting and sharing customizable bento grids. Design, collaborate, and monetize your grid creations effortlessly, powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
