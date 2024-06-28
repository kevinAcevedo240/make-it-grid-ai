
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "react-hot-toast";
import { FloatingMenu } from "@/components/menu/floating-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GridProvider } from '@/context/useGridContext';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MakeItGrid | Bento Grid Generator",
  description: "Empower your creativity with MakeItGrid, the ultimate platform for crafting and sharing customizable bento grids. Design, collaborate, and monetize your grid creations effortlessly, powered by AI.",
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
                <FloatingMenu />
              </div>
              <Toaster />
            </GridProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
