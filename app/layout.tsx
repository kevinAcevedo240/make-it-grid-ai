
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GridProvider } from '@/context/useGridContext';
import { Analytics } from "@vercel/analytics/react"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MakeItGrid | Bento Grid Generator",
  description:
    "Empower your creativity with MakeItGrid, the ultimate platform for crafting customizable bento grids.",
  authors: {
    name: "Kevin Acevedo",
  },
  keywords: [
    "Bento Grid Generator",
    "Bento Grid Maker",
    "Bento Grid Creator",
    "Bento Grid Design",
    "Bento Grid Tool",
    "Bento Grid Builder",
    "Free Bento Grid Generator",
    "HTML and CSS Grid Generator",
    "Tailwind CSS Generator",
    "Tailwind Grid Generator",
    "Tailwind CSS Grid Generator",
    "Tailwind CSS Grid Maker",
    "Tailwind Bento Grid Generator",
    "CSS Grid Generator",
    "Responsive Design",
    "Customizable Grids",
    "Grid Layouts",
    "AI Grid Design",
    "Dark Mode",
    "Light Mode",
    "Online Grid Maker",
    "Online Grid Generator",
    "Online Grid Builder",
    "Free Online Grid Builder",
    "Free Online Grid Generator",
    "Free Online Bento Grid",
    "Free Online Bento Grid Generator",
    "Grid Layout Tool",
    "Design Platform",
    "Code Sandbox Integration",
    "Web Design",
    "Front-end Development",
    "React",
    "TypeScript",
    "Shadcn UI"
  ],
  robots: "index, follow",
  icons: {
    icon: {
      url: "/favicon.ico",
      type: "image/x-icon",
    },
    shortcut: { url: "/favicon.ico", type: "image/x-icon" },
  },
  openGraph: {
    title: "MakeItGrid | Bento Grid Generator",
    description:
      "Empower your creativity with MakeItGrid, the ultimate platform for crafting customizable bento grids.",
    url: "https://make-it-grid-ai.vercel.app/",
    type: "website",
    images: [
      {
        url: "https://make-it-grid-ai.vercel.app/MakeItGrid_Logo.png", 
        width: 800,
        height: 600,
        alt: "MakeItGrid Logo",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={100}>
            <GridProvider>
              <div className="container mx-auto p-4 mt-2">
                {children}
                <Analytics />
              </div>
              <Toaster />
            </GridProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
