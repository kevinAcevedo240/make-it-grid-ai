

"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button onClick={toggleTheme} variant="ghost" size="sm" className="h-10 w-10 px-0">
      {theme === "light" ? (
        <MoonIcon className="transition-all 2xl:size-7 text-muted-foreground size-8" />
      ) : (
        <SunIcon className="transition-all 2xl:size-7 size-8" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
