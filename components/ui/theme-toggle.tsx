

"use client"

import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import * as Icons from "@/components/icons";

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button onClick={toggleTheme} variant="ghost" size="sm" className="size-10 px-0 active:scale-90 z-10">
      {theme === "light" ? (
        <Icons.Dark className="transition-all 2xl:size-7 text-muted-foreground size-8" />
      ) : (
        <Icons.Light className="transition-all 2xl:size-7 size-8" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
