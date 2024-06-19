import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import Footer from "@/components/footer";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { Toaster } from "react-hot-toast";

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
          <div className="container mx-auto p-4 mt-2">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold mb-4">MakeItGrid AI</h1>
              <ModeToggle />
            </div>
            {children}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
