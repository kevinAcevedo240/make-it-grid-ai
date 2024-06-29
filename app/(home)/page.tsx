
'use client'

import GridLayout from "@/components/GridLayout";
import { TourProvider } from '@reactour/tour'
import { steps, styles } from "@/utils/guide-steps";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Particles from "@/components/ui/particles";
import NavBar from "@/components/navbar";
import { FloatingMenu } from "@/components/menu/floating-menu";



export default function Home() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
 
  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
  
  return (
    <TourProvider
      className="rounded-lg !bg-muted"
      styles={styles}
      startAt={1}
      steps={steps}
    >
      <NavBar/>
      <GridLayout/>
      <FloatingMenu />
      <Particles
        className="absolute inset-0 opacity-50"
        quantity={100}
        ease={60}
        color={color}
        refresh
      />

    </TourProvider>
  );
}
