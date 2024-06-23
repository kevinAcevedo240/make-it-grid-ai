
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { FloatingMenu } from "@/components/menu/floating-menu";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GridProvider } from '@/hooks/useGridContext';
import NavBar from "@/components/navbar";


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
                <NavBar/>
                {children}
                <FloatingMenu />
                {/* <Footer /> */}
              </div>
              <Toaster />
            </GridProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
